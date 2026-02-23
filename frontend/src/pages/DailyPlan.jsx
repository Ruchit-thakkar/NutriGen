import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import {
  Loader2,
  Plus,
  Target,
  Droplets,
  Moon,
  Flame,
  Utensils,
  AlertCircle,
  Trash2,
  Zap,
} from "lucide-react";

// 1. Import your newly created components
import Food from "./Food";
import Exercise from "./Exercise";

const DailyPlan = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [needsGeneration, setNeedsGeneration] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const [logData, setLogData] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    water: "",
    sleep: "",
  });
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    const fetchTodayPlan = async () => {
      try {
        const { data } = await api.get("/api/dailyPlan/today");
        if (data.success) setPlan(data.plan);
      } catch (error) {
        if (error.response?.status === 400) setNeedsProfile(true);
        else if (error.response?.status === 404) setNeedsGeneration(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayPlan();
  }, []);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const { data } = await api.post("/api/dailyPlan/generate");
      if (data.success) {
        setPlan(data.plan);
        setNeedsGeneration(false);
        toast.success("Today's plan is ready. Let's crush it! 💪");
      }
    } catch (error) {
      if (error.response?.status === 400) setNeedsProfile(true);
      else toast.error("Failed to generate plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogChange = (e) =>
    setLogData({ ...logData, [e.target.name]: e.target.value });

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    setIsLogging(true);

    if (
      !logData.name &&
      (logData.calories || logData.protein || logData.carbs || logData.fats)
    ) {
      toast.error("Please enter a Food/Drink Name");
      setIsLogging(false);
      return;
    }

    const payload = {
      name: logData.name || (logData.water ? "Water" : "Sleep"),
      calories: Number(logData.calories) || 0,
      protein: Number(logData.protein) || 0,
      carbs: Number(logData.carbs) || 0,
      fats: Number(logData.fats) || 0,
      water: Number(logData.water) || 0,
      sleep: Number(logData.sleep) || 0,
    };

    try {
      const { data } = await api.post("/api/dailyPlan/log", payload);
      if (data.success) {
        toast.success("Logged successfully!");
        setPlan(data.plan);
        setLogData({
          name: "",
          calories: "",
          protein: "",
          carbs: "",
          fats: "",
          water: "",
          sleep: "",
        });
      }
    } catch (error) {
      toast.error("Failed to log intake.");
    } finally {
      setIsLogging(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/api/dailyPlan/log/${itemId}`);
      if (data.success) {
        toast.success("Item removed");
        setPlan(data.plan);
      }
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  if (loading)
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl flex flex-col items-center">
          <Loader2 className="animate-spin text-teal-500 mb-4" size={48} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Loading Engine
          </p>
        </div>
      </div>
    );

  if (needsProfile)
    return (
      <div className="max-w-md mx-auto pt-20 animate-in fade-in zoom-in-95 duration-500 text-center">
        <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-white">
          <AlertCircle className="text-amber-500 w-20 h-20 mx-auto mb-6 drop-shadow-md" />
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Profile Required
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            We need your body metrics to calculate your targets.
          </p>
          <Link
            to="/dashboard"
            className="block w-full bg-gradient-to-r from-teal-500 to-emerald-400 text-white py-4 rounded-2xl font-bold shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Complete My Profile
          </Link>
        </div>
      </div>
    );

  if (needsGeneration)
    return (
      <div className="max-w-md mx-auto pt-20 animate-in fade-in zoom-in-95 duration-500 text-center">
        <div className="bg-slate-900/95 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(20,184,166,0.2)] border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-teal-500/10 border border-teal-400/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Zap className="text-teal-400" size={36} />
            </div>
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
              Ready for today?
            </h2>
            <p className="text-slate-400 mb-8 font-medium text-lg leading-relaxed">
              Let's generate your custom calorie and macro targets based on your
              profile.
            </p>
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all flex justify-center items-center gap-2"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Generate Today's Plan"
              )}
            </button>
          </div>
        </div>
      </div>
    );

  if (!plan) return null;
  const { targets, actuals, consumedItems } = plan;

  return (
    <div className="max-w-6xl mx-auto pb-24 pt-4 animate-in fade-in duration-700 relative z-10 pb-32">
      <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-8 mb-10">
        Today's Plan
      </h1>

      {/* TOP SECTION: Tracking Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📊 MAIN TRACKING DASHBOARD */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl border border-slate-700 relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]"></div>
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
              <div>
                <div className="flex items-center gap-2 text-teal-400 mb-3">
                  <div className="p-1.5 bg-teal-500/20 rounded-lg">
                    <Flame size={18} />
                  </div>
                  <span className="font-bold tracking-widest uppercase text-xs">
                    Energy Intake
                  </span>
                </div>
                <h2 className="text-6xl font-black mb-1 tracking-tighter">
                  {actuals.calories}{" "}
                  <span className="text-3xl text-slate-500 font-bold">
                    / {targets.calories}
                  </span>
                </h2>
                <p className="text-slate-400 font-medium">
                  kcal consumed today
                </p>
              </div>
              <ProgressRing
                radius={70}
                stroke={14}
                progress={(actuals.calories / targets.calories) * 100}
                color="text-teal-400"
                bgColor="text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MacroCard
              title="Protein"
              actual={actuals.protein}
              target={targets.protein}
              color="text-rose-500"
              bgColor="text-rose-100/50"
            />
            <MacroCard
              title="Carbs"
              actual={actuals.carbs}
              target={targets.carbs}
              color="text-amber-500"
              bgColor="text-amber-100/50"
            />
            <MacroCard
              title="Fats"
              actual={actuals.fats}
              target={targets.fats}
              color="text-blue-500"
              bgColor="text-blue-100/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HabitCard
              title="Water Intake"
              actual={actuals.water}
              target={targets.water}
              unit="L"
              icon={<Droplets size={24} className="text-sky-500" />}
            />
            <HabitCard
              title="Sleep"
              actual={actuals.sleep}
              target={targets.sleep}
              unit="hrs"
              icon={<Moon size={24} className="text-indigo-500" />}
            />
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 tracking-tight">
              <div className="bg-teal-50 p-2 rounded-xl text-teal-600 border border-teal-100/50">
                <Utensils size={20} />
              </div>
              Food Log
            </h3>
            {consumedItems?.length === 0 ? (
              <div className="bg-white/40 border border-white/60 rounded-2xl p-8 text-center text-slate-400 font-medium">
                Nothing logged yet today.
              </div>
            ) : (
              <div className="space-y-4">
                {consumedItems
                  ?.slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center p-5 bg-white/80 border border-white shadow-sm rounded-2xl hover:shadow-md transition-all group"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800 capitalize text-lg tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1 font-medium">
                          <span className="text-slate-700 font-bold">
                            {item.calories} kcal
                          </span>{" "}
                          • {item.protein}g P • {item.carbs}g C • {item.fats}g F
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-slate-300 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 p-2.5 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* 📝 QUICK LOG SIDEBAR */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white h-fit lg:sticky lg:top-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/50">
            <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-inner">
              <Plus size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              Quick Log
            </h3>
          </div>

          <form onSubmit={handleLogSubmit} className="space-y-5">
            <LogInput
              label="Food/Drink Name"
              name="name"
              type="text"
              value={logData.name}
              onChange={handleLogChange}
              placeholder="e.g., Grilled Salmon"
            />
            <LogInput
              label="Calories"
              name="calories"
              value={logData.calories}
              onChange={handleLogChange}
              placeholder="+ kcal"
            />

            <div className="grid grid-cols-3 gap-3">
              <LogInput
                label="Protein"
                name="protein"
                value={logData.protein}
                onChange={handleLogChange}
                placeholder="+ g"
              />
              <LogInput
                label="Carbs"
                name="carbs"
                value={logData.carbs}
                onChange={handleLogChange}
                placeholder="+ g"
              />
              <LogInput
                label="Fats"
                name="fats"
                value={logData.fats}
                onChange={handleLogChange}
                placeholder="+ g"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 mt-2 border-t border-white/50">
              <LogInput
                label="Water"
                name="water"
                value={logData.water}
                onChange={handleLogChange}
                placeholder="+ L"
                step="0.5"
              />
              <LogInput
                label="Sleep"
                name="sleep"
                value={logData.sleep}
                onChange={handleLogChange}
                placeholder="+ hrs"
                step="0.5"
              />
            </div>

            <button
              type="submit"
              disabled={isLogging}
              className="w-full mt-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4 rounded-2xl font-black shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              {isLogging ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Log Intake"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: Embedded Food & Exercise Suggestions */}
      <div className="mt-16 border-t border-slate-200/60 pt-16 space-y-24">
        {/* Render the Food Module */}
        <section>
          <Food />
        </section>

        {/* Render the Exercise Module */}
        <section>
          <Exercise />
        </section>
      </div>
    </div>
  );
};

// --- Helper Components ---
const ProgressRing = ({ radius, stroke, progress, color, bgColor }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const safeProgress = Math.max(0, Math.min(progress || 0, 100));
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center drop-shadow-md">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${bgColor}`}
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${color}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-2xl font-black tracking-tighter">
        {Math.round(safeProgress)}%
      </div>
    </div>
  );
};

const MacroCard = ({ title, actual, target, color, bgColor }) => (
  <div className="bg-white/50 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center transition-all hover:-translate-y-1">
    <h4 className="text-slate-400 font-black tracking-widest uppercase text-[10px] mb-5">
      {title}
    </h4>
    <ProgressRing
      radius={45}
      stroke={8}
      progress={target > 0 ? (actual / target) * 100 : 0}
      color={color}
      bgColor={bgColor}
    />
    <div className="mt-5">
      <span className="text-2xl font-black text-slate-800">{actual}</span>
      <span className="text-slate-400 font-bold text-sm"> / {target}g</span>
    </div>
  </div>
);

const HabitCard = ({ title, actual, target, unit, icon }) => (
  <div className="bg-white/50 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex items-center gap-5 transition-all hover:-translate-y-1">
    <div className="bg-white p-4 rounded-2xl shadow-inner border border-slate-50">
      {icon}
    </div>
    <div>
      <h4 className="text-slate-400 font-black tracking-widest uppercase text-[10px] mb-1">
        {title}
      </h4>
      <p className="text-3xl font-black text-slate-800 tracking-tight">
        {actual}{" "}
        <span className="text-lg text-slate-400 font-bold">
          / {target} {unit}
        </span>
      </p>
    </div>
  </div>
);

const LogInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  step = "1",
  type = "number",
}) => (
  <div>
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      step={step}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3.5 bg-white/60 border border-white shadow-sm rounded-2xl focus:bg-white focus:ring-2 focus:ring-teal-500/50 outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
    />
  </div>
);

export default DailyPlan;
