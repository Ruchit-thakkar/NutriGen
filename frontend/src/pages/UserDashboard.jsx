import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  LayoutDashboard,
  User,
  Utensils,
  LogOut,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

// Components
import Profile from "./Profile";
import DailyPlan from "./DailyPlan";
import Progress from "./Progress";
import DashboardStats from "./DashboardStats";
import HelpCenter from "./HelpCenter";
// 🟢 1. Import the InstallPWA component
import InstallPWA from "../components/InstallPWA";

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "diet", label: "Daily Plan", icon: Utensils },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "profile", label: "Profile", icon: User },
    { id: "help", label: "Support", icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-teal-200 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-teal-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <aside className="hidden md:flex w-72 flex-col bg-slate-900/95 backdrop-blur-2xl text-slate-300 p-6 shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-slate-800 z-20 transition-all relative">
        <div className="flex items-center gap-3 mb-12 px-2 group cursor-pointer">
          <img
            src="/logo.png"
            alt="NutriGen Logo"
            className="h-10 w-auto transition-transform group-hover:scale-110 duration-300"
          />
          <h1 className="text-2xl font-black tracking-tight text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">
            NutriGen
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={<item.icon size={22} strokeWidth={2.5} />}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800/50 flex flex-col gap-2">
          {/* 🟢 2. Placed InstallPWA right above the Logout button */}
          <InstallPWA />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-slate-400 hover:text-rose-400 transition-all p-4 rounded-2xl hover:bg-rose-500/10 font-bold group"
          >
            <LogOut
              size={22}
              className="group-hover:-translate-x-1 transition-transform"
              strokeWidth={2.5}
            />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 w-full h-full relative z-10">
        <header className="md:hidden flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 border-b border-white/50 shadow-sm z-20 relative">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="NutriGen Logo" className="h-8 w-auto" />
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              NutriGen
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-500 bg-white/50 border border-white rounded-full transition-all shadow-sm"
          >
            <LogOut size={20} strokeWidth={2.5} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto w-full p-4 md:p-8 pb-32 md:pb-8 scroll-smooth">
          <div className="max-w-6xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "dashboard" && (
              <DashboardStats setActiveTab={setActiveTab} />
            )}
            {activeTab === "profile" && <Profile />}
            {activeTab === "diet" && <DailyPlan />}
            {activeTab === "progress" && <Progress />}
            {activeTab === "help" && <HelpCenter />}
          </div>
        </main>

        <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 px-2 pb-safe pt-2 rounded-3xl">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-16 h-full space-y-1 transition-all duration-300 ${
                  activeTab === item.id
                    ? "text-teal-600 scale-105"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div
                  className={`${activeTab === item.id ? "bg-teal-50 shadow-inner border border-teal-100/50 p-1.5 rounded-xl" : ""}`}
                >
                  <item.icon
                    size={22}
                    strokeWidth={activeTab === item.id ? 2.5 : 2}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-wide">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 py-4 px-5 rounded-2xl transition-all duration-300 font-bold group ${
      isActive
        ? "bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-900 shadow-[0_0_20px_rgba(20,184,166,0.2)] translate-x-2"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
    }`}
  >
    <div
      className={`${isActive ? "text-slate-900" : "text-slate-400 group-hover:text-teal-400 transition-colors"}`}
    >
      {icon}
    </div>
    {label}
  </button>
);

export default UserDashboard;
