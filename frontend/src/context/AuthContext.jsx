import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 2️⃣ Login
  const login = async (credentials) => {
    try {
      const { data } = await api.post("/api/auth/login", credentials);
      if (data.success) {
        const loggedInUser = data.data || data.user;
        setUser(loggedInUser);
        toast.success(data.message || "Logged in successfully!");

        // 🟢 IT MUST RETURN THIS OBJECT:
        return { success: true, user: loggedInUser };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
    }
  };

  // 3️⃣ Register
  const register = async (userData) => {
    try {
      const { data } = await api.post("/api/auth/register", userData);
      if (data.success) {
        toast.success("Account created! Please login.");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // 4️⃣ Logout
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      setUser(null);
      toast.error("Logout completed with minor errors");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading ? (
        children
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
