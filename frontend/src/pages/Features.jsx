import { Link } from "react-router-dom";
import {
  Activity,
  Target,
  Flame,
  Sparkles,
  TrendingUp,
  HeartPulse,
  ChevronRight,
  Droplets,
  Moon,
  Zap,
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: <Zap size={28} />,
      title: "Daily Smart Engine",
      description:
        "Don't know what to eat? Our AI generates a custom daily plan with exact macro targets based on your current biometrics and goals.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "AI Trend Analysis",
      description:
        "NutriGen doesn't just show you graphs; it reads them. Get automated insights and actionable feedback on your 7-day and 30-day progress.",
    },
    {
      icon: <HeartPulse size={28} />,
      title: "Clinical-Grade Profiles",
      description:
        "Factor in medical conditions, allergies, job types, and daily steps. Your plan adapts to your real life, not just your weight.",
    },
    {
      icon: <Target size={28} />,
      title: "Dynamic Macro Splitting",
      description:
        "Whether you are aiming for fat loss, muscle gain, or body recomposition, your protein, carb, and fat ratios are mathematically optimized.",
    },
    {
      icon: <Flame size={28} />,
      title: "Frictionless Quick Logging",
      description:
        "Log your meals, water intake, and sleep in seconds from your dashboard. Watch your progress rings fill up in real-time.",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Lifetime Tracking",
      description:
        "Visualize your journey from day one. Beautiful area and bar charts show your adherence to calorie and macro targets over time.",
    },
  ];

  return (
    <div className="relative min-h-screen font-sans text-slate-800 bg-slate-50 overflow-hidden pt-32 pb-24 selection:bg-teal-200">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* =========================================
          1️⃣ HERO SECTION
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center mb-24 animate-in slide-in-from-bottom-5 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-sm tracking-wide mb-6 shadow-sm">
          <Activity size={16} />
          DATA-DRIVEN NUTRITION
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
          A Dashboard Built for <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            Total Optimization
          </span>
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
          NutriGen goes beyond simple calorie counting. We combine deep
          biometric profiling with AI-driven trend analysis to give you the
          ultimate health command center.
        </p>
      </div>

      {/* =========================================
          2️⃣ FEATURE GRID (Marketing the backend)
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {coreFeatures.map((feature, idx) => (
          <div
            key={idx}
            className="group bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(20,184,166,0.15)] hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* =========================================
          3️⃣ BENTO BOX UI SHOWCASE
          (Visually mocking the actual dashboard)
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Peek Inside the Engine
          </h2>
          <p className="text-lg text-gray-500 font-medium mt-4">
            Designed for clarity, built for results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mock Dashboard Card 1: AI Insight */}
          <div className="md:col-span-2 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-center overflow-hidden relative group">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <Sparkles size={28} className="text-white" />
                </div>
                <span className="font-bold tracking-widest uppercase text-sm text-teal-50">
                  AI Trend Analysis
                </span>
              </div>
              <p className="text-3xl md:text-4xl font-black leading-tight">
                "You consistently hit your protein targets, but falling short on
                hydration is stalling your fat loss."
              </p>
            </div>
          </div>

          {/* Mock Dashboard Card 2: Habit Tracking */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden border border-slate-800 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-indigo-400">
                <Moon size={24} />
                <span className="font-bold tracking-widest uppercase text-xs">
                  Sleep Target
                </span>
              </div>
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold">
                Optimal
              </span>
            </div>
            <div>
              <p className="text-5xl font-black mb-1">
                7.5 <span className="text-2xl text-slate-500">/ 8</span>
              </p>
              <p className="text-slate-400 font-medium">Hours logged today</p>
              <div className="mt-6 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[90%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          4️⃣ CTA SECTION
      ========================================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] p-12 md:p-20 border border-white shadow-[0_20px_60px_rgb(0,0,0,0.08)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-400/20 rounded-full blur-[80px] -z-10"></div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Stop guessing your macros. <br className="hidden md:block" /> Start
            achieving your goals.
          </h2>
          <p className="text-gray-600 mb-10 text-lg font-medium max-w-xl mx-auto">
            Set up your clinical-grade profile in less than 2 minutes and let
            our engine generate your first daily plan.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-10 py-5 rounded-full text-xl font-black shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Create Your Free Profile
            <ChevronRight
              className="transition-transform group-hover:translate-x-1 text-teal-400"
              size={24}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
