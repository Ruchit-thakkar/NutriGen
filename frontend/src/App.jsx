import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context & Guards
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Components
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer"; // 🟢 Fixed path to point to components

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();

  // 👇 SMART LAYOUT LOGIC
  // We don't want the public Navbar and Footer showing up inside the Dashboard
  // because the Dashboard has its own Sidebar and full-screen layout.
  const isAppRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen antialiased selection:bg-teal-200 selection:text-teal-900">
      <AuthProvider>
        {/* Conditionally render Navbar */}
        {!isAppRoute && <Navbar />}

        {/* 👇 GLASSMORPHIC TOAST NOTIFICATIONS */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              color: "#0f172a", // slate-900
              borderRadius: "1.5rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(255, 255, 255, 1)",
              fontWeight: "600",
              padding: "16px 24px",
            },
            success: {
              iconTheme: { primary: "#14b8a6", secondary: "#fff" }, // Teal
            },
            error: {
              iconTheme: { primary: "#f43f5e", secondary: "#fff" }, // Rose
            },
          }}
        />

        <Routes>
          {/* 👇 PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />

          {/* 👇 PROTECTED APP ROUTES */}
          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 👇 CATCH-ALL ROUTE (Redirects to home if route doesn't exist) */}
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Conditionally render Footer */}
        {!isAppRoute && <Footer />}
      </AuthProvider>
    </div>
  );
}

export default App;
