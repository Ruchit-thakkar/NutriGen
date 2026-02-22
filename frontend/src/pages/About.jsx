import { Link } from "react-router-dom";
import {
  Activity,
  ShieldCheck,
  BrainCircuit,
  Dna,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <BrainCircuit size={28} />,
      title: "Data Over Dogma",
      description:
        "We don't subscribe to fad diets. Every recommendation our engine makes is rooted in peer-reviewed nutritional science and your specific metabolic math.",
    },
    {
      icon: <Dna size={28} />,
      title: "Radical Personalization",
      description:
        "You are biologically unique. Your nutrition plan should be too. We build plans that adapt to your allergies, preferences, and clinical realities.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Privacy First",
      description:
        "Your health data is highly sensitive. NutriGen is built with enterprise-grade security to ensure your biometrics are encrypted and strictly yours.",
    },
  ];

  return (
    <div className="relative min-h-screen font-sans text-slate-800 bg-slate-50 overflow-hidden pt-32 pb-24 selection:bg-teal-200">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[50rem] h-[50rem] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* =========================================
          1️⃣ HERO / MANIFESTO SECTION
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="max-w-4xl mx-auto text-center animate-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-sm tracking-wide mb-6 shadow-sm">
            <Zap size={16} className="text-amber-500" fill="currentColor" />
            OUR MISSION
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
            We are ending the era of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              generic meal plans.
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            For decades, the fitness industry has sold one-size-fits-all diets
            to millions of entirely unique bodies. NutriGen was built to flip
            that model upside down using clinical data, smart algorithms, and
            seamless design.
          </p>
        </div>
      </div>

      {/* =========================================
          2️⃣ THE ENGINE (Split Layout)
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 mb-32">
        {/* Left: Glassmorphic Visual representation of the Tech */}
        <div className="lg:w-1/2 w-full relative flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px] -z-10"></div>

          <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl border border-white w-full relative overflow-hidden group hover:shadow-[0_20px_60px_rgb(20,184,166,0.15)] transition-all duration-500">
            {/* Decorative Background Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                <div className="bg-blue-50 text-blue-500 p-3 rounded-xl">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Input
                  </p>
                  <p className="font-black text-slate-800 text-lg">
                    Biometric Profile
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-200 to-teal-200 rounded-full"></div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-2xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-white/20 text-white p-3 rounded-xl backdrop-blur-md">
                  <BrainCircuit size={28} />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-50 uppercase tracking-widest">
                    Processing
                  </p>
                  <p className="font-black text-white text-xl">
                    NutriGen Core AI
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="h-8 w-1 bg-gradient-to-b from-emerald-300 to-emerald-100 rounded-full"></div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                <div className="bg-amber-50 text-amber-500 p-3 rounded-xl">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Output
                  </p>
                  <p className="font-black text-slate-800 text-lg">
                    Optimized Daily Plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Built by engineers. <br /> Backed by science.
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            We realized that calculating precise macronutrients, managing
            clinical restrictions, and analyzing weekly progress trends is too
            much math for a human to do every day.
          </p>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            So, we built an engine to do it for you. NutriGen processes your
            specific variables—from your age and activity level to your primary
            goals and medical conditions—to output a perfectly calibrated
            roadmap.
          </p>
        </div>
      </div>

      {/* =========================================
          3️⃣ CORE VALUES
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Our Core Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(20,184,166,0.15)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-700">
                {val.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {val.title}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
          4️⃣ BOTTOM CTA (Matching Aesthetics)
      ========================================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px]"></div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10 leading-tight">
            Ready to let the data <br /> drive your results?
          </h2>
          <p className="text-slate-400 mb-10 text-lg font-medium relative z-10 max-w-2xl mx-auto">
            Join the platform that is fundamentally changing how people approach
            their daily nutrition.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-900 px-10 py-5 rounded-full text-xl font-black shadow-[0_0_40px_rgb(20,184,166,0.3)] hover:shadow-[0_0_60px_rgb(20,184,166,0.5)] hover:-translate-y-1 transition-all duration-300 relative z-10"
          >
            Start Your Journey
            <ChevronRight
              className="transition-transform group-hover:translate-x-1 text-slate-900"
              size={24}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
