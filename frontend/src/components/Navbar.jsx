import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import InstallPWA from "./InstallPWA";
import LogoutConfirmModal from "./LogoutConfirmModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
  ];

  const executeLogout = async () => {
    setIsLogoutModalOpen(false);
    await logout();
    setIsOpen(false);
    navigate("/login");
  };

  const dashboardLink = user?.role === "admin" ? "/admin" : "/dashboard";
  const dashboardText = user?.role === "admin" ? "Admin Portal" : "Dashboard";
  const DashboardIcon = user?.role === "admin" ? ShieldCheck : LayoutDashboard;
  const badgeColor =
    user?.role === "admin"
      ? "bg-indigo-100 text-indigo-700"
      : "bg-teal-100 text-teal-700";
  const btnColor =
    user?.role === "admin"
      ? "text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
      : "text-teal-700 bg-teal-50 hover:bg-teal-100";

  return (
    <>
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={executeLogout}
      />

      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-7xl transition-all duration-500 ease-out rounded-full border border-white/40 backdrop-blur-xl ${scrolled ? "bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3" : "bg-white/60 shadow-sm py-4"}`}
        >
          <div className="px-6 md:px-8 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-extrabold flex items-center gap-2 tracking-tight group"
            >
              <img
                src="/logo.png"
                alt="NutriGen Logo"
                className="h-8 w-auto transition-transform group-hover:scale-110 duration-300"
              />
              <span className="bg-gradient-to-r from-teal-700 to-emerald-500 bg-clip-text text-transparent">
                NutriGen
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 font-medium">
              <div className="flex items-center gap-8 mr-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="relative group py-1 text-gray-600 transition-colors hover:text-teal-700"
                    >
                      <span
                        className={isActive ? "text-teal-800 font-bold" : ""}
                      >
                        {link.name}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300 ease-out rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                      ></span>
                    </Link>
                  );
                })}
              </div>

              <div className="h-6 w-[2px] bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

              {user ? (
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2 bg-gray-50/50 px-3 py-1.5 rounded-full border border-gray-100">
                    <div className={`${badgeColor} p-1.5 rounded-full`}>
                      <User size={16} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 pr-2">
                      {user.fullName?.firstName || "User"}
                    </span>
                  </div>

                  <Link
                    to={dashboardLink}
                    className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-colors ${btnColor}`}
                  >
                    <DashboardIcon size={18} /> {dashboardText}
                  </Link>

                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-gray-600 font-semibold hover:text-teal-700 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="group flex items-center gap-1 bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                    <ChevronRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 p-2 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-full transition-colors focus:outline-none"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU DROPDOWN */}
        <div
          className={`absolute top-full mt-4 w-[calc(100%-2rem)] max-w-md mx-auto pointer-events-auto transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}`}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`p-3 rounded-2xl font-semibold transition-colors ${location.pathname === link.path ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>

            <div className="mb-2">
              <InstallPWA />
            </div>

            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className={`${badgeColor} p-2 rounded-full`}>
                    <User size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">
                      {user.fullName?.firstName || "Welcome back"}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={dashboardLink}
                    className={`flex justify-center items-center gap-2 py-3 rounded-2xl font-bold transition-colors ${btnColor}`}
                  >
                    {dashboardText}
                  </Link>
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex justify-center items-center gap-2 text-red-600 bg-red-50 py-3 rounded-2xl font-bold hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="w-full text-center p-3 rounded-2xl font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center bg-gradient-to-r from-teal-600 to-emerald-500 text-white p-3 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
