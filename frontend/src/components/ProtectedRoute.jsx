import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 🟢 Added 'allowedRoles' prop (defaults to allowing all roles if not specified)
const ProtectedRoute = ({ children, allowedRoles = ["user", "admin"] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // AuthContext handles showing the spinner
  }

  // 1. Not logged in? Go to login.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. 🟢 Logged in, but WRONG ROLE? Go to unauthorized (or home)
  // Example: user.role is "user", but allowedRoles is ["admin"]
  if (!allowedRoles.includes(user.role)) {
    // If a regular user tries to access admin, send them to their dashboard
    if (user.role === "user") {
      return <Navigate to="/dashboard" replace />;
    }
    // If somehow an admin tries to access a user-only page (rare), send them home
    return <Navigate to="/" replace />;
  }

  // 3. User is logged in AND has the correct role
  return children;
};

export default ProtectedRoute;
