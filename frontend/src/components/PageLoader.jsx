import React from "react";

const PageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Soft Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Outer Spinning Ring */}
        <div className="absolute inset-0 w-32 h-32 -m-4 rounded-full border-t-4 border-teal-500 border-opacity-50 animate-spin"></div>
        <div
          className="absolute inset-0 w-32 h-32 -m-4 rounded-full border-b-4 border-emerald-500 border-opacity-50 animate-spin"
          style={{ animationDirection: "reverse" }}
        ></div>

        {/* Pulsing Logo */}
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl border border-white animate-pulse">
          <img
            src="/logo.png"
            alt="Loading NutriGen..."
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Loading Text */}
        <p className="mt-8 text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">
          Loading NutriGen...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
