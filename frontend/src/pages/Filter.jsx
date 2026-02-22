import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import {
  Loader2,
  Filter as FilterIcon,
  Sparkles,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const metricsList = [
  { id: "calories", label: "Calories" },
  { id: "protein", label: "Protein" },
  { id: "carbs", label: "Carbs" },
  { id: "fats", label: "Fats" },
  { id: "water", label: "Water" },
  { id: "sleep", label: "Sleep" },
];

const timeframes = [
  { id: "week", label: "7 Days" },
  { id: "month", label: "30 Days" },
  { id: "year", label: "This Year" },
];

// Helper to get the correct unit
const getUnit = (metric) => {
  const units = {
    calories: "kcal",
    protein: "g",
    carbs: "g",
    fats: "g",
    water: "L",
    sleep: "hrs",
  };
  return units[metric] || "";
};

const Filter = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [insight, setInsight] = useState("");

  const [selectedMetric, setSelectedMetric] = useState("calories");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/progress/filter?metric=${selectedMetric}&timeframe=${selectedTimeframe}`,
        );
        if (data.success) {
          setChartData(data.data);
          setInsight(data.insight);
        }
      } catch (error) {
        toast.error("Failed to load filtered data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [selectedMetric, selectedTimeframe]);

  // 🟢 DYNAMIC MATH: Calculate Totals and Percentages right here!
  const totalActual = chartData.reduce(
    (sum, day) => sum + (day.Actual || 0),
    0,
  );
  const totalTarget = chartData.reduce(
    (sum, day) => sum + (day.Target || 0),
    0,
  );
  const percentage =
    totalTarget > 0 ? Math.round((totalActual / totalTarget) * 100) : 0;

  // Find the label for the timeframe ("7 Days", "30 Days") to display in the header
  const timeframeLabel = timeframes.find(
    (t) => t.id === selectedTimeframe,
  )?.label;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-8 animate-in fade-in duration-700">
      {/* 🚀 HEADER */}
      <div className="mb-10 mt-16 flex items-center gap-4">
        <div className="bg-slate-900 p-3 rounded-2xl">
          <FilterIcon className="text-teal-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Deep Dive
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Filter your progress and view automated trend analysis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 🎛️ CONTROLS SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
            <div className="mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-teal-500" /> Select Metric
              </h3>
              <div className="flex flex-col gap-2">
                {metricsList.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMetric(m.id)}
                    className={`px-4 py-3 rounded-xl font-bold text-left transition ${
                      selectedMetric === m.id
                        ? "bg-teal-50 text-teal-700 border-2 border-teal-500"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-teal-500" /> Timeframe
              </h3>
              <div className="flex flex-col gap-2">
                {timeframes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTimeframe(t.id)}
                    className={`px-4 py-3 rounded-xl font-bold text-left transition ${
                      selectedTimeframe === t.id
                        ? "bg-slate-900 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 📊 GRAPH & INSIGHTS DISPLAY */}
        <div className="lg:col-span-3 space-y-8">
          {/* ✨ AUTOMATED INSIGHT CARD */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-400 rounded-[2rem] p-8 shadow-lg text-white flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Sparkles size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-teal-50 font-bold tracking-widest uppercase text-xs mb-1">
                AI Trend Analysis
              </h3>
              <p className="text-2xl font-black">
                {loading ? "Analyzing data..." : insight}
              </p>
            </div>
          </div>

          {/* 📈 DYNAMIC BAR CHART */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
            {/* 🟢 NEW: SUMMARY HEADER SECTION */}
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
              <div>
                <h3 className="text-xl font-black text-gray-800 capitalize flex items-center gap-3">
                  {selectedMetric} Overview
                  {loading && (
                    <Loader2 className="animate-spin text-teal-500" size={20} />
                  )}
                </h3>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                  {timeframeLabel} Total
                </p>
              </div>

              {!loading && chartData.length > 0 && (
                <div className="text-right flex flex-col items-end">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900">
                      {Math.round(totalActual)}
                    </span>
                    <span className="text-gray-400 font-medium text-sm">
                      / {Math.round(totalTarget)} {getUnit(selectedMetric)}
                    </span>
                  </div>

                  {/* Percentage Badge */}
                  <div
                    className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      percentage >= 100
                        ? "bg-emerald-100 text-emerald-700"
                        : percentage >= 80
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    <Target size={14} />
                    {percentage}% Achieved
                  </div>
                </div>
              )}
            </div>

            {/* CHART RENDERING */}
            {!loading && chartData.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
                No data logged for this timeframe.
              </div>
            ) : (
              <div className="h-80 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorActual"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#0d9488" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#2dd4bf"
                          stopOpacity={0.8}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{
                        borderRadius: "1rem",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />

                    <Bar
                      dataKey="Target"
                      fill="#e2e8f0"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                    />
                    <Bar
                      dataKey="Actual"
                      fill="url(#colorActual)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
