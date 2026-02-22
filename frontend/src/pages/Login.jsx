import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ChevronRight, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Default redirect if they weren't sent here from a specific page
  const defaultFrom = location.state?.from?.pathname;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData);

    if (result && result.success) {
      const loggedInUser = result.user;

      // 🟢 STRICT ROLE REDIRECT
      if (loggedInUser?.role === "admin") {
        // If they are an admin, ALWAYS send them to /admin
        navigate("/admin", { replace: true });
      } else {
        // If standard user, send them to their intended page, or /dashboard
        const destination = defaultFrom || "/dashboard";
        navigate(destination, { replace: true });
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden py-24 px-4 selection:bg-teal-200">
      {/* 🔮 Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-400/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Glassmorphic Card */}
      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-white z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
        {/* Header */}
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-teal-100 to-emerald-50 mb-6 shadow-inner border border-white overflow-hidden">
            {/* Replaced 🧬 emoji with logo.png */}
            <img
              src="/logo.png"
              alt="NutriGen Logo"
              className="w-12 h-12 object-contain transition-transform hover:scale-105 duration-300"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Back
            </span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 text-lg">
            Log in to access your AI nutrition engine.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                size={20}
                className="text-slate-400 group-focus-within:text-teal-500 transition-colors"
              />
            </div>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-semibold text-slate-800 placeholder:text-slate-400 text-lg"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock
                size={20}
                className="text-slate-400 group-focus-within:text-teal-500 transition-colors"
              />
            </div>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-semibold text-slate-800 placeholder:text-slate-400 text-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-900 py-4 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(20,184,166,0.3)] hover:shadow-[0_15px_40px_rgba(20,184,166,0.4)] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin text-slate-900" />
            ) : (
              <>
                Log In
                <ChevronRight
                  size={24}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          {/* Register Link */}
          <p className="text-center text-slate-500 mt-8 font-medium text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-teal-600 font-black hover:text-emerald-500 transition-colors ml-1 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
