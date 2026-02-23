import React, { useState, useEffect } from "react";
import { Users, LineChart, Loader2, Target, CalendarDays } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../utils/api";
import { toast } from "react-hot-toast";

const AdminGraphs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const res = await api.get("/api/admin/graphs");
        if (res.data.success) {
          setData(res.data);
        }
      } catch (error) {
        toast.error("Failed to load graph data.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-sm flex flex-col items-center">
          <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Loading Analytics
          </p>
        </div>
      </div>
    );
  }

  const { totalUsers, graphs } = data;

  return (
    <div className="space-y-8 pb-32 mt-4 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ">
      {/* 1️⃣ Page Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Registration Analytics
          </h2>
          <p className="text-slate-500 font-medium mt-1 text-lg">
            Monitor platform growth and user acquisition trends.
          </p>
        </div>

        {/* Highlighted Total Users Badge */}
        <div className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white shadow-sm flex items-center gap-5">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 border border-white shadow-inner">
            <Users size={24} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Users
            </p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tighter">
              {totalUsers.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* 2️⃣ Short Term Graphs (7 Days & 30 Days) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 7 Days Graph */}
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.06)] transition-all">
          <div className="flex items-center gap-3 mb-6 border-b border-white/50 pb-4">
            <CalendarDays className="text-indigo-500" size={22} />
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              Past 7 Days
            </h3>
          </div>
          <AdminBarChart
            data={graphs.sevenDays}
            color="#6366f1"
            gradientId="color7Days"
          />
        </div>

        {/* 30 Days Graph */}
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.06)] transition-all">
          <div className="flex items-center gap-3 mb-6 border-b border-white/50 pb-4">
            <LineChart className="text-violet-500" size={22} />
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              Past 30 Days
            </h3>
          </div>
          <AdminBarChart
            data={graphs.thirtyDays}
            color="#8b5cf6"
            gradientId="color30Days"
          />
        </div>
      </div>

      {/* 3️⃣ Lifetime Growth Graph */}
      <div className="bg-slate-900/95 backdrop-blur-md p-8 lg:p-10 rounded-[2.5rem] shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between mb-8 border-b border-slate-700/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400 border border-slate-700">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Lifetime Registrations
              </h3>
              <p className="text-slate-400 font-medium mt-1 text-sm">
                Aggregated by month
              </p>
            </div>
          </div>
        </div>

        {/* Taller container for lifetime data */}
        <div className="h-[350px]">
          <AdminBarChart
            data={graphs.lifetime}
            color="#a78bfa"
            gradientId="colorLifetime"
            dark
          />
        </div>
      </div>
    </div>
  );
};

/* --- Reusable Chart Component (Upgraded styles!) --- */
const AdminBarChart = ({ data, color, gradientId, dark = false }) => (
  <div className="w-full h-64 relative z-10 pt-2">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
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
          allowDecimals={false} // Prevents decimals like 1.5 users
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
            fontWeight: "bold",
            color: dark ? "#fff" : "#0f172a",
          }}
          itemStyle={{ fontWeight: "800", color: color }}
        />
        <Bar
          dataKey="users"
          name="Registrations"
          fill={`url(#${gradientId})`} // Uses the dynamic gradient
          radius={[4, 4, 0, 0]} // Flat bottom, rounded top
          barSize={window.innerWidth > 768 ? 32 : 16}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AdminGraphs;
