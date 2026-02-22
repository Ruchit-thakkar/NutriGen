import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import {
  Loader2,
  User,
  Activity,
  Target,
  CalendarDays,
  Award,
  Flame,
  Ruler,
  Weight,
  HeartPulse,
  Briefcase,
  Footprints,
  Droplets,
  MoonStar,
  Clock,
  ShieldAlert,
  Utensils,
  Mail,
  Sparkles,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// 🟢 Accept setActiveTab as a prop
const DashboardStat = ({ setActiveTab }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [todaySnapshot, setTodaySnapshot] = useState({
    plan: null,
    exercises: null,
    food: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const dateString = new Date().toISOString().split("T")[0];

        // Fetch Dashboard + Today's info in parallel
        const [dashRes, planRes, exRes, foodRes] = await Promise.allSettled([
          api.get("/api/dashboard/full"),
          api.get("/api/dailyPlan/today"),
          api.get(`/api/exercises/suggest?date=${dateString}`),
          api.get(`/api/food/suggest?date=${dateString}`),
        ]);

        if (dashRes.status === "fulfilled" && dashRes.value.data.success) {
          setStats(dashRes.value.data);
        } else {
          throw new Error("Failed to load core dashboard data.");
        }

        // Safely extract today's read-only snapshot data
        setTodaySnapshot({
          plan: planRes.status === "fulfilled" ? planRes.value.data.plan : null,
          exercises:
            exRes.status === "fulfilled" ? exRes.value.data.data : null,
          food: foodRes.status === "fulfilled" ? foodRes.value.data.data : null,
        });
      } catch (error) {
        toast.error(error.message || "Failed to sync data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center font-sans">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl flex flex-col items-center">
          <Loader2 className="animate-spin text-teal-500 mb-4" size={48} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Syncing Biometrics
          </p>
        </div>
      </div>
    );
  }

  if (!stats || !stats.profile) {
    return (
      <div className="max-w-3xl mx-auto pt-20 animate-in fade-in zoom-in-95 duration-500 font-sans">
        <div className="bg-white/70 backdrop-blur-2xl p-12 rounded-[3rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-[80px] -z-10"></div>
          <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-white">
            <User size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Profile Incomplete
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto mb-8">
            Please set up your body metrics in the Profile tab to unlock your AI
            performance dashboard.
          </p>
          {/* 🟢 Click switches tab to profile */}
          <button
            onClick={() => setActiveTab("profile")}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-slate-800 transition-colors"
          >
            Complete Profile <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  const { profile, thirtyDay, lifetime } = stats;

  return (
    <div className="relative min-h-screen font-sans text-slate-800 bg-slate-50 overflow-hidden pt-16 pb-24 px-6 md:px-12">
      {/* Background Glow Orbs for Depth */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 animate-in fade-in duration-700">
        {/* 🚀 HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-8">
          <div className="flex items-center gap-5">
            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-sm border border-white text-teal-600">
              <Sparkles size={36} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {getGreeting()},{" "}
                <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent capitalize">
                  {user?.name || "Athlete"}
                </span>
              </h1>
              <p className="text-slate-500 font-medium text-lg mt-2 flex items-center gap-2">
                <Mail size={16} className="opacity-50" />{" "}
                {user?.email || "No email provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 👤 SECTION 1: COMPREHENSIVE PROFILE (Left Column) */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white h-full hover:shadow-[0_20px_60px_rgb(20,184,166,0.1)] transition-shadow duration-500">
              {/* Profile Avatar Header */}
              <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-200/60 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-[2rem] flex items-center justify-center mb-4 border-2 border-white shadow-inner relative group">
                  <User
                    size={40}
                    className="text-teal-600 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-black text-slate-800 capitalize tracking-tight">
                  {profile.basic?.gender || "User"}
                </h3>
                <div className="inline-flex items-center gap-2 bg-teal-50/80 backdrop-blur-md px-4 py-1.5 rounded-full mt-3 border border-teal-100/50">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  <p className="text-teal-700 font-bold text-sm">
                    Age: {profile.basic?.age || "-"}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* 📏 Vitals & Body */}
                <ProfileSection
                  title="Vitals & Body"
                  icon={<Activity size={16} />}
                >
                  <ProfileRow
                    icon={<Ruler size={16} />}
                    label="Height"
                    value={`${profile.basic?.height || "-"} cm`}
                  />
                  <ProfileRow
                    icon={<Weight size={16} />}
                    label="Weight"
                    value={`${profile.basic?.weight || "-"} kg`}
                  />
                  <ProfileRow
                    icon={<Flame size={16} />}
                    label="Body Fat"
                    value={`${profile.basic?.bodyFat || "-"}%`}
                  />
                </ProfileSection>

                {/* 🎯 Goals */}
                <ProfileSection title="Core Goals" icon={<Target size={16} />}>
                  <ProfileRow
                    icon={<Award size={16} />}
                    label="Focus"
                    value={
                      profile.goals?.primaryGoal?.replace("_", " ") || "Not set"
                    }
                    highlight
                  />
                  <ProfileRow
                    icon={<Target size={16} />}
                    label="Target Wt"
                    value={`${profile.goals?.targetWeight || "-"} kg`}
                  />
                  <ProfileRow
                    icon={<Clock size={16} />}
                    label="Timeline"
                    value={`${profile.goals?.timeline || "-"} weeks`}
                    capitalize
                  />
                </ProfileSection>

                {/* 🏃 Lifestyle */}
                <ProfileSection
                  title="Lifestyle"
                  icon={<Briefcase size={16} />}
                >
                  <ProfileRow
                    icon={<Activity size={16} />}
                    label="Activity"
                    value={profile.lifestyle?.activityLevel || "Not set"}
                    capitalize
                  />
                  <ProfileRow
                    icon={<Footprints size={16} />}
                    label="Daily Steps"
                    value={profile.lifestyle?.stepsPerDay || "-"}
                  />
                  <ProfileRow
                    icon={<Briefcase size={16} />}
                    label="Job Type"
                    value={profile.lifestyle?.jobType || "-"}
                    capitalize
                  />
                  <ProfileRow
                    icon={<Utensils size={16} />}
                    label="Diet Pref"
                    value={profile.basic?.regionFoodPreference || "Mixed"}
                    capitalize
                  />
                </ProfileSection>

                {/* ⚕️ Health & Habits */}
                <ProfileSection
                  title="Health Specs"
                  icon={<HeartPulse size={16} />}
                >
                  <ProfileRow
                    icon={<Droplets size={16} />}
                    label="Water Goal"
                    value={`${profile.health?.waterTarget || "-"} L/day`}
                  />
                  <ProfileRow
                    icon={<MoonStar size={16} />}
                    label="Sleep Goal"
                    value={`${profile.health?.sleepTarget || "-"} hrs`}
                  />
                  <div className="pt-3 space-y-4">
                    <ArrayDisplay
                      label="Medical"
                      icon={<HeartPulse size={14} />}
                      data={profile.health?.medicalConditions}
                    />
                    <ArrayDisplay
                      label="Allergies"
                      icon={<ShieldAlert size={14} />}
                      data={profile.health?.allergies}
                    />
                  </div>
                </ProfileSection>
              </div>
            </div>
          </div>

          {/* 📊 RIGHT COLUMN: Today Snapshot + Graphs */}
          <div className="xl:col-span-3 space-y-8">
            {/* 🌟 NEW SECTION: TODAY'S READ-ONLY SNAPSHOT */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-slate-700 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex justify-between items-end mb-8 border-b border-slate-700 pb-6 relative z-10">
                <div>
                  <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
                    Today's Overview
                  </h3>
                  <p className="text-slate-400 font-medium text-lg">
                    Your quick snapshot of today's targets and protocols.
                  </p>
                </div>
                {/* 🟢 Click switches tab to diet */}
                <button
                  onClick={() => setActiveTab("diet")}
                  className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors backdrop-blur-md border border-white/10"
                >
                  Full Plan <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Module 1: Macros */}
                <div className="bg-slate-800/50 rounded-[2rem] p-6 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-teal-400">
                    <Target size={20} />{" "}
                    <h4 className="font-bold tracking-widest uppercase text-xs">
                      Macros
                    </h4>
                  </div>
                  {todaySnapshot.plan ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400 font-medium">
                          Calories
                        </span>
                        <span className="text-2xl font-black text-white">
                          {todaySnapshot.plan.actuals.calories}{" "}
                          <span className="text-sm text-slate-500">
                            / {todaySnapshot.plan.targets.calories}
                          </span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                          style={{
                            width: `${Math.min((todaySnapshot.plan.actuals.calories / todaySnapshot.plan.targets.calories) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-700/50">
                        <span className="text-rose-400">
                          P: {todaySnapshot.plan.actuals.protein}g
                        </span>
                        <span className="text-amber-400">
                          C: {todaySnapshot.plan.actuals.carbs}g
                        </span>
                        <span className="text-blue-400">
                          F: {todaySnapshot.plan.actuals.fats}g
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm italic">
                      No plan generated for today.
                    </p>
                  )}
                </div>

                {/* Module 2: Exercise */}
                <div className="bg-slate-800/50 rounded-[2rem] p-6 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-emerald-400">
                    <Dumbbell size={20} />{" "}
                    <h4 className="font-bold tracking-widest uppercase text-xs">
                      Workout
                    </h4>
                  </div>
                  {todaySnapshot.exercises?.exercises?.length > 0 ? (
                    <ul className="space-y-3">
                      {todaySnapshot.exercises.exercises
                        .slice(0, 3)
                        .map((ex, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-emerald-500 shrink-0 mt-0.5"
                            />
                            <span className="font-semibold text-slate-200 line-clamp-1">
                              {ex.name}
                            </span>
                          </li>
                        ))}
                      {todaySnapshot.exercises.exercises.length > 3 && (
                        <li className="text-xs text-slate-500 font-bold pl-6">
                          + {todaySnapshot.exercises.exercises.length - 3} more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-slate-400 text-sm italic">
                      Rest day or no exercises loaded.
                    </p>
                  )}
                </div>

                {/* Module 3: Food */}
                <div className="bg-slate-800/50 rounded-[2rem] p-6 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-orange-400">
                    <Utensils size={20} />{" "}
                    <h4 className="font-bold tracking-widest uppercase text-xs">
                      Meals
                    </h4>
                  </div>
                  {todaySnapshot.food?.menu ? (
                    <ul className="space-y-3">
                      {Object.keys(todaySnapshot.food.menu).map(
                        (mealType, idx) => {
                          const mealOptions = todaySnapshot.food.menu[mealType];
                          if (
                            !mealOptions ||
                            mealOptions.length === 0 ||
                            idx > 2
                          )
                            return null;
                          return (
                            <li key={idx} className="text-sm">
                              <span className="font-black text-slate-400 capitalize block text-[10px] uppercase tracking-widest">
                                {mealType}
                              </span>
                              <span className="font-semibold text-slate-200 line-clamp-1">
                                {mealOptions[0].name}
                              </span>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  ) : (
                    <p className="text-slate-400 text-sm italic">
                      No specific meals suggested.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 📅 SECTION 2: 30-DAY PROGRESS (Light Glass) */}
            <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transition-all duration-500 hover:shadow-[0_20px_60px_rgb(20,184,166,0.1)]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10 gap-6 border-b border-slate-200/60 pb-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                    <div className="bg-teal-50 text-teal-600 p-2 rounded-xl border border-teal-100">
                      <CalendarDays size={24} />
                    </div>
                    Past 30 Days
                  </h3>
                  <p className="text-slate-500 font-medium mt-3 text-lg">
                    Energy intake trends vs. targets.
                  </p>
                </div>
                <PercentageBadge percentage={thirtyDay.percentage} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatBox
                  title="Total Consumed"
                  value={thirtyDay.totals.calActual.toLocaleString()}
                  unit="kcal"
                  icon={<Flame size={20} className="text-orange-500" />}
                />
                <StatBox
                  title="Total Target"
                  value={thirtyDay.totals.calTarget.toLocaleString()}
                  unit="kcal"
                  icon={<Target size={20} className="text-teal-500" />}
                />
                <StatBox
                  title="Avg Daily Intake"
                  value={thirtyDay.averages.calActual.toLocaleString()}
                  unit="kcal/day"
                  highlight
                />
              </div>

              <ProgressChart data={thirtyDay.chartData} />
            </div>

            {/* 🏆 SECTION 3: OVERALL / LIFETIME PROGRESS (Dark Glass) */}
            <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-slate-700 relative overflow-hidden text-white group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10 gap-6 border-b border-slate-800 pb-6">
                  <div>
                    <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                      <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/30">
                        <Award size={24} />
                      </div>
                      Lifetime Progress
                    </h3>
                    <p className="text-slate-400 font-medium mt-3 text-lg">
                      From day one to today ({lifetime.daysTracked} days
                      tracked).
                    </p>
                  </div>
                  <PercentageBadge percentage={lifetime.percentage} dark />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <StatBox
                    dark
                    title="Total Consumed"
                    value={lifetime.totals.calActual.toLocaleString()}
                    unit="kcal"
                    icon={<Flame size={20} className="text-orange-400" />}
                  />
                  <StatBox
                    dark
                    title="Total Target"
                    value={lifetime.totals.calTarget.toLocaleString()}
                    unit="kcal"
                    icon={<Target size={20} className="text-blue-400" />}
                  />
                  <StatBox
                    dark
                    title="Avg Daily Intake"
                    value={lifetime.averages.calActual.toLocaleString()}
                    unit="kcal/day"
                    highlight
                  />
                </div>

                <ProgressChart data={lifetime.chartData} dark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE UI COMPONENTS ---
const ProfileSection = ({ title, icon, children }) => (
  <div>
    <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-200/60">
      <span className="text-teal-500">{icon}</span> {title}
    </h4>
    <div className="space-y-3.5">{children}</div>
  </div>
);

const ProfileRow = ({ icon, label, value, highlight, capitalize }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center gap-2.5 text-slate-500 group-hover:text-teal-600 transition-colors">
      <span className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 shadow-sm">
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
    <span
      className={`text-sm font-black text-right ${capitalize ? "capitalize" : ""} ${highlight ? "text-teal-600" : "text-slate-800"}`}
    >
      {value}
    </span>
  </div>
);

const ArrayDisplay = ({ label, icon, data }) => (
  <div>
    <div className="flex items-center gap-2.5 text-slate-500 mb-3">
      <span className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 shadow-sm">
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {data && data.length > 0 ? (
        data.map((item, idx) => (
          <span
            key={idx}
            className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold capitalize shadow-sm"
          >
            {item}
          </span>
        ))
      ) : (
        <span className="text-slate-400 text-sm font-medium italic bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
          None specified
        </span>
      )}
    </div>
  </div>
);

const PercentageBadge = ({ percentage, dark }) => (
  <div
    className={`flex flex-col md:items-end ${dark ? "text-white" : "text-slate-900"}`}
  >
    <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
      Adherence Rate
    </span>
    <div
      className={`text-4xl font-black flex items-center gap-2 ${percentage >= 100 ? "text-emerald-500" : percentage >= 80 ? "text-amber-500" : "text-rose-500"}`}
    >
      <Target size={32} /> {percentage}%
    </div>
  </div>
);

const StatBox = ({ title, value, unit, highlight, dark, icon }) => (
  <div
    className={`p-6 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
      dark
        ? "bg-slate-800/40 backdrop-blur-md border-slate-700 hover:bg-slate-800/60"
        : "bg-white/60 backdrop-blur-md border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
    }`}
  >
    {highlight && (
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${dark ? "bg-teal-400" : "bg-teal-500"}`}
      ></div>
    )}
    <div className="flex items-center gap-2 mb-3 mt-1">
      {icon && <span className={dark ? "opacity-80" : ""}>{icon}</span>}
      <h4
        className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-slate-400" : "text-slate-500"}`}
      >
        {title}
      </h4>
    </div>
    <div className="flex items-baseline gap-1.5">
      <span
        className={`text-3xl font-black ${highlight ? (dark ? "text-teal-400" : "text-teal-600") : dark ? "text-white" : "text-slate-900"}`}
      >
        {value}
      </span>
      <span
        className={`text-sm font-bold ${dark ? "text-slate-500" : "text-slate-400"}`}
      >
        {unit}
      </span>
    </div>
  </div>
);

const ProgressChart = ({ data, dark }) => (
  <div className="h-80 w-full mt-8">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id={dark ? "colorActualDark" : "colorActualLight"}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={dark ? "#14b8a6" : "#0d9488"}
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor={dark ? "#14b8a6" : "#0d9488"}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: dark ? "#94a3b8" : "#94a3b8",
            fontSize: 12,
            fontWeight: 700,
          }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: dark ? "#64748b" : "#94a3b8",
            fontSize: 12,
            fontWeight: 600,
          }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "1.5rem",
            border: dark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(255,255,255,1)",
            backgroundColor: dark
              ? "rgba(15, 23, 42, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            color: dark ? "#fff" : "#0f172a",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            fontWeight: "bold",
            padding: "12px 20px",
          }}
          itemStyle={{ fontWeight: "800" }}
        />
        <Legend
          iconType="circle"
          wrapperStyle={{
            paddingTop: "24px",
            fontSize: "13px",
            fontWeight: "800",
            color: dark ? "#f8fafc" : "#1e293b",
          }}
        />
        <Area
          type="monotone"
          dataKey="Target"
          stroke={dark ? "#64748b" : "#cbd5e1"}
          strokeWidth={3}
          fill="transparent"
          strokeDasharray="6 6"
        />
        <Area
          type="monotone"
          dataKey="Actual"
          stroke={dark ? "#2dd4bf" : "#0d9488"}
          strokeWidth={5}
          fill={`url(#${dark ? "colorActualDark" : "colorActualLight"})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardStat;
