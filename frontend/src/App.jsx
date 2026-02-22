import { Suspense, lazy } from "react"; // 🟢 1. Import Suspense and lazy
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context & Guards (Keep these as standard imports)
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import PageLoader from "./components/PageLoader"; // 🟢 2. Import your new loader

// 🟢 3. Lazy Load your Pages!
// This breaks them into separate smaller files (chunks) automatically.
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Features = lazy(() => import("./pages/Features"));
const About = lazy(() => import("./pages/About"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  const location = useLocation();

  const isAppRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen antialiased selection:bg-teal-200 selection:text-teal-900">
      <AuthProvider>
        {!isAppRoute && <Navbar />}

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              color: "#0f172a",
              borderRadius: "1.5rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(255, 255, 255, 1)",
              fontWeight: "600",
              padding: "16px 24px",
            },
            success: { iconTheme: { primary: "#14b8a6", secondary: "#fff" } },
            error: { iconTheme: { primary: "#f43f5e", secondary: "#fff" } },
          }}
        />

        {/* 🟢 4. Wrap Routes in Suspense to trigger the loader while chunks download */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        {!isAppRoute && <Footer />}
      </AuthProvider>
    </div>
  );
}

export default App;
