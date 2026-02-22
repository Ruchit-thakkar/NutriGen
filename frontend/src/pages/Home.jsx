import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Home = () => {
  return (
    <div className="relative font-sans text-slate-800 bg-slate-50 overflow-hidden">
      {/* Background Glow Orbs for Glassmorphism Context */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* =========================================
          2️⃣ HERO SECTION
      ========================================= */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Personalized Nutrition, <br />
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Built for Your Body
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
              NutriGen analyzes your lifestyle, health data, and goals to create
              smart, science-based nutrition plans—just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                Get Your Nutrition Plan
                <ChevronRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/features"
                className="bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 text-center shadow-sm"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right: Visual (Glassmorphism Mockup) */}
          <div className="md:w-1/2 relative w-full flex justify-center">
            {/* Mockup Card representing the App Dashboard */}
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-white max-w-sm w-full rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-500 ease-out">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-800">
                    Daily Goal
                  </h3>
                  <p className="text-sm font-medium text-teal-600">
                    Protein focused
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-50 text-teal-700 rounded-full flex items-center justify-center font-black text-xl shadow-inner border border-white">
                  94
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/60 rounded-2xl flex items-center gap-4 border border-white shadow-sm hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl shadow-inner">
                    🥗
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      Lunch Recommendation
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      Grilled Salmon & Quinoa
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white/60 rounded-2xl flex items-center gap-4 border border-white shadow-sm hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl shadow-inner">
                    🍎
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Afternoon Snack</p>
                    <p className="text-sm text-gray-500 font-medium">
                      Apple & Almond Butter
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          3️⃣ TRUST SIGNALS (Floating Pill Strip)
      ========================================= */}
      <section className="relative z-10 px-6 -mt-8 mb-16">
        <div className="max-w-6xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-full py-6 px-8 shadow-2xl flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm md:text-base font-semibold text-slate-200">
          <span className="flex items-center gap-2">
            <CheckIcon /> Science-based recommendations
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon /> Personalized for every individual
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon /> Privacy-first data handling
          </span>
        </div>
      </section>

      {/* =========================================
          4️⃣ HOW NUTRIGEN WORKS
      ========================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            How NutriGen Works
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Smart nutrition in 4 simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Profile",
              desc: "Tell us about your age, diet, goals & lifestyle.",
            },
            {
              step: "02",
              title: "Analyze",
              desc: "NutriGen analyzes your inputs using nutrition logic.",
            },
            {
              step: "03",
              title: "Personalize",
              desc: "Get a customized diet plan & daily guidance.",
            },
            {
              step: "04",
              title: "Improve",
              desc: "Track progress and refine recommendations over time.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl font-black bg-gradient-to-br from-teal-200 to-emerald-100 bg-clip-text text-transparent mb-6 transition-transform group-hover:scale-110 origin-left">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          5️⃣ CORE FEATURES & 6️⃣ WHO IS IT FOR
      ========================================= */}
      <section className="relative py-24 px-6 z-10">
        {/* Soft Background Layer */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl -z-10 rounded-[3rem] shadow-[0_-20px_60px_rgb(0,0,0,0.02)] border-t border-white mx-4 md:mx-12"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Why NutriGen Works
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              No guesswork. Just data-driven results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <FeatureCard
              icon="🧬"
              title="Personalized Plans"
              desc="Diets tailored to your body, preferences, and goals."
            />
            <FeatureCard
              icon="📊"
              title="Nutrition Insights"
              desc="Macro & micro-nutrient breakdowns you can understand."
            />
            <FeatureCard
              icon="🥗"
              title="Smart Suggestions"
              desc="What to eat, what to limit, and exactly why."
            />
            <FeatureCard
              icon="🔁"
              title="Adaptive Logic"
              desc="Plans evolve as your lifestyle or goals change."
            />
            <FeatureCard
              icon="🔒"
              title="Secure Data"
              desc="Your health data stays private and protected."
            />
            <FeatureCard
              icon="⚡"
              title="Real-time Tracking"
              desc="Log food instantly and get immediate feedback."
            />
          </div>

          {/* Who is it for? */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 md:p-16 shadow-2xl border border-slate-700 text-center relative overflow-hidden">
            {/* Decorative Glow inside dark card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]"></div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight relative z-10">
              Who Is NutriGen For?
            </h3>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {[
                "Fitness Enthusiasts",
                "Busy Professionals",
                "Students",
                "Health-Conscious",
                "Weight Management",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-teal-50 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/20 hover:-translate-y-1 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          7️⃣ SAMPLE OUTPUT / PREVIEW
      ========================================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            See What Your Plan <br /> Looks Like
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Before you commit, see how NutriGen breaks down your daily nutrition
            into simple, beautiful, actionable steps.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 text-teal-600 font-bold text-lg hover:text-emerald-500 transition-colors"
          >
            Generate My Plan
            <ChevronRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Visual Card (Glassmorphism + Gradient Bars) */}
        <div className="md:w-1/2 w-full bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white hover:shadow-[0_20px_60px_rgb(20,184,166,0.15)] transition-shadow duration-500">
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Daily Score
              </p>
              <p className="text-4xl font-black bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                A+
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Calories
              </p>
              <p className="text-xl font-bold text-slate-800">
                1,850 <span className="text-slate-400 text-sm">/ 2,000</span>
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
              <div className="flex justify-between font-bold text-sm mb-2 text-slate-700">
                <span>Protein</span> <span>140g</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 w-[80%] rounded-full"></div>
              </div>
            </div>
            <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
              <div className="flex justify-between font-bold text-sm mb-2 text-slate-700">
                <span>Carbs</span> <span>200g</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[50%] rounded-full"></div>
              </div>
            </div>
            <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
              <div className="flex justify-between font-bold text-sm mb-2 text-slate-700">
                <span>Fats</span> <span>55g</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 w-[30%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          8️⃣ CALL TO ACTION (Floating Giant Card)
      ========================================= */}
      <section className="py-24 px-6 z-10 relative">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-teal-600 to-emerald-600 rounded-[3rem] py-20 px-8 text-center text-white shadow-[0_20px_60px_rgb(20,184,166,0.3)] border border-teal-400/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight relative z-10">
            Your Body Is Unique. <br /> Your Nutrition Should Be Too.
          </h2>
          <p className="text-teal-100 mb-10 text-lg font-medium relative z-10">
            Takes less than 2 minutes • No guesswork • Free to start
          </p>
          <Link
            to="/register"
            className="group relative z-10 inline-flex items-center gap-2 bg-white text-teal-800 px-10 py-5 rounded-full text-xl font-black shadow-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300"
          >
            Start with NutriGen
            <ChevronRight
              className="transition-transform group-hover:translate-x-1 text-teal-600"
              size={24}
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

/* --- Helper Components (Internal) --- */

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
      {title}
    </h3>
    <p className="text-gray-600 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;
