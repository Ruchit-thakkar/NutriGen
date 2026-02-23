import { useState, useEffect } from "react";
import { Loader2, TrendingUp, Target } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Progress = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await api.get("/api/progress/weekly");
        if (data.success) {
          const formattedData = data.weeklyData.map((day) => ({
            name: day.day,
            calActual: day.actuals.calories,
            calTarget: day.targets.calories,
            proActual: day.actuals.protein,
            proTarget: day.targets.protein,
            carbActual: day.actuals.carbs,
            carbTarget: day.targets.carbs,
            fatActual: day.actuals.fats,
            fatTarget: day.targets.fats,
            waterActual: day.actuals.water,
            waterTarget: day.targets.water,
            sleepActual: day.actuals.sleep,
            sleepTarget: day.targets.sleep,
          }));
          setWeeklyData(formattedData);
        }
      } catch (error) {
        toast.error("Failed to load weekly progress.");
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading)
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl flex flex-col items-center">
          <Loader2 className="animate-spin text-teal-500 mb-4" size={48} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Loading Trends
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto  pt-4 animate-in fade-in duration-700 relative z-10 pb-32">
      <div className="mb-10 mt-8 flex items-center gap-5">
        <div className="bg-white/60 backdrop-blur-xl p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          <TrendingUp className="text-teal-600" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Weekly Progress
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-1">
            Your 7-day totals and daily breakdowns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProgressChart
          title="Calories"
          unit="kcal"
          data={weeklyData}
          actualKey="calActual"
          targetKey="calTarget"
          actualColor="#0d9488"
          targetColor="#ccfbf1"
        />
        <ProgressChart
          title="Protein"
          unit="g"
          data={weeklyData}
          actualKey="proActual"
          targetKey="proTarget"
          actualColor="#f43f5e"
          targetColor="#ffe4e6"
        />
        <ProgressChart
          title="Carbs"
          unit="g"
          data={weeklyData}
          actualKey="carbActual"
          targetKey="carbTarget"
          actualColor="#f59e0b"
          targetColor="#fef3c7"
        />
        <ProgressChart
          title="Fats"
          unit="g"
          data={weeklyData}
          actualKey="fatActual"
          targetKey="fatTarget"
          actualColor="#3b82f6"
          targetColor="#dbeafe"
        />
        <ProgressChart
          title="Water"
          unit="L"
          data={weeklyData}
          actualKey="waterActual"
          targetKey="waterTarget"
          actualColor="#0ea5e9"
          targetColor="#e0f2fe"
        />
        <ProgressChart
          title="Sleep"
          unit="hrs"
          data={weeklyData}
          actualKey="sleepActual"
          targetKey="sleepTarget"
          actualColor="#6366f1"
          targetColor="#e0e7ff"
        />
      </div>
    </div>
  );
};

const ProgressChart = ({
  title,
  unit,
  data,
  actualKey,
  targetKey,
  actualColor,
  targetColor,
}) => {
  const totalActual = data.reduce((sum, day) => sum + (day[actualKey] || 0), 0);
  const totalTarget = data.reduce((sum, day) => sum + (day[targetKey] || 0), 0);
  const percentage =
    totalTarget > 0 ? Math.round((totalActual / totalTarget) * 100) : 0;

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col hover:shadow-[0_20px_60px_rgb(20,184,166,0.1)] transition-all duration-500">
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/50">
        <div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            {title}
          </h3>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            7-Day Total
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900">
              {Math.round(totalActual)}
            </span>
            <span className="text-slate-400 font-bold text-sm">
              / {Math.round(totalTarget)} {unit}
            </span>
          </div>
          <div
            className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${percentage >= 100 ? "bg-emerald-50/80 border-emerald-200 text-emerald-700" : percentage >= 80 ? "bg-amber-50/80 border-amber-200 text-amber-700" : "bg-rose-50/80 border-rose-200 text-rose-700"}`}
          >
            <Target size={12} /> {percentage}% Achieved
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(0,0,0,0.05)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.4)" }}
              contentStyle={{
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,1)",
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                fontWeight: "bold",
                color: "#0f172a",
              }}
              itemStyle={{ fontWeight: "800" }}
            />
            <Bar
              dataKey={targetKey}
              name="Target"
              fill={targetColor}
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey={actualKey}
              name="Actual"
              fill={actualColor}
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Progress;
