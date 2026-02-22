import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, Lock, ChevronRight } from "lucide-react"; // ✨ Added Icons

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data for the backend
    const payload = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    // Call the context function
    const success = await register(payload);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden py-24 px-4">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-400/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-white z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-50 mb-4 shadow-inner border border-white overflow-hidden">
            {/* Replaced 🧬 emoji with logo.png */}
            <img
              src="/logo.png"
              alt="NutriGen Logo"
              className="w-10 h-10 object-contain transition-transform hover:scale-105 duration-300"
            />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Join{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              NutriGen
            </span>
          </h2>
          <p className="text-gray-500 font-medium mt-2">
            Create your personalized nutrition profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Row */}
          <div className="flex gap-4">
            <div className="relative w-1/2 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User
                  size={18}
                  className="text-gray-400 group-focus-within:text-teal-500 transition-colors"
                />
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-gray-400"
              />
            </div>
            <div className="relative w-1/2 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User
                  size={18}
                  className="text-gray-400 group-focus-within:text-teal-500 transition-colors"
                />
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                size={18}
                className="text-gray-400 group-focus-within:text-teal-500 transition-colors"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-gray-400"
            />
          </div>

          {/* Phone */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone
                size={18}
                className="text-gray-400 group-focus-within:text-teal-500 transition-colors"
              />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (Optional)"
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock
                size={18}
                className="text-gray-400 group-focus-within:text-teal-500 transition-colors"
              />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Create a Password"
              required
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group w-full flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            Create Account
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-6 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-bold hover:text-emerald-500 transition-colors ml-1"
            >
              Log in instead
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
