import React, { useState, useEffect } from "react";
import { Users, Activity, Loader2, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import api from "../utils/api";
import { toast } from "react-hot-toast";

const AdminOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeUsersCount, setActiveUsersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, usersRes] = await Promise.all([
          api.get("/api/admin/overview"),
          api.get("/api/admin/users"),
        ]);

        if (overviewRes.data.success && usersRes.data.success) {
          setData(overviewRes.data);

          // 🟢 CALCULATE ACTIVE USERS (Last 48h) exactly like AdminUsers.jsx
          const recentUsers = usersRes.data.users.filter(
            (u) => u.active === true,
          );
          setActiveUsersCount(recentUsers.length);
        }
      } catch (error) {
        toast.error("Failed to load admin data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-sm flex flex-col items-center">
          <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Loading System Data
          </p>
        </div>
      </div>
    );
  }

  const { stats, graphs } = data;

  return (
    <div className="space-y-8 mt-4 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          System Overview
        </h2>
        <p className="text-slate-500 font-medium mt-1 text-lg">
          High-level snapshot of platform growth and engagement.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="text-indigo-500" size={28} />}
          trend="All-time accounts"
        />
        <AdminStatCard
          title="Active Profiles (Last 48h)"
          value={activeUsersCount}
          icon={<Activity className="text-emerald-500" size={28} />}
          trend="Recently engaged"
        />
      </div>

      {/* ====================================================
          LIFETIME REGISTRATION GRAPH
      ==================================================== */}
      <div className="bg-white/60 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(99,102,241,0.08)] transition-shadow duration-500">
        <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-white/50 pb-6 mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 border border-white shadow-sm">
                <Target size={24} />
              </div>
              Lifetime Growth
            </h3>
            <p className="text-slate-500 font-medium mt-2">
              Overall user registration history across the platform's lifespan.
            </p>
          </div>
        </div>

        {/* Large Lifetime Graph Container */}
        <div className="bg-slate-900/95 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-slate-700 relative overflow-hidden h-[400px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          {/* 🟢 Render the beautiful graph component */}
          <AdminBarChart data={graphs.lifetime} color="#818cf8" dark />
        </div>
      </div>
    </div>
  );
};

/* --- Helper Components --- */

const AdminStatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
        {icon}
      </div>
      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">
        {title}
      </h4>
    </div>
    <div className="flex items-baseline gap-3">
      <span className="text-6xl font-black text-slate-800 tracking-tighter">
        {value}
      </span>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      <p className="text-sm font-bold text-slate-500">{trend}</p>
    </div>
  </div>
);

// 🟢 Upgraded Graph styled similarly to Progress.jsx
const AdminBarChart = ({ data, color, dark = false }) => (
  <div className="w-full h-full relative z-10 pt-2">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          {/* Custom Gradient for Bars */}
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: dark ? "#94a3b8" : "#64748b",
            fontSize: 12,
            fontWeight: 600,
          }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: dark ? "#64748b" : "#94a3b8",
            fontSize: 12,
          }}
          allowDecimals={false}
        />
        <Tooltip
          cursor={{
            fill: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
          }}
          contentStyle={{
            borderRadius: "1rem",
            border: "none",
            backgroundColor: dark
              ? "rgba(15, 23, 42, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            color: dark ? "#fff" : "#0f172a",
          }}
        />
        <Bar
          dataKey="users"
          name="Registrations"
          fill="url(#colorUsers)" // Use the gradient
          radius={[4, 4, 0, 0]} // Rounded top corners, flat bottom
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AdminOverview;
