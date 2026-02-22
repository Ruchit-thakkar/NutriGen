import React, { useState, useEffect } from "react";
import {
  Activity,
  Clock,
  Flame,
  AlertCircle,
  Repeat,
  Timer,
  Target as TargetIcon,
} from "lucide-react";
import api from "../utils/api";

const Exercise = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/exercises/suggest?date=${selectedDate}`,
        );
        if (data.success) setWorkoutPlan(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load workout plan.");
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [selectedDate]);

  // Group exercises by category so we can render them in clean sections
  const groupedExercises = workoutPlan?.exercises?.reduce((acc, ex) => {
    if (!acc[ex.category]) acc[ex.category] = [];
    acc[ex.category].push(ex);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="text-center py-10 text-slate-500 font-bold">
        Loading premium workout routines...
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="w-full relative z-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-200/60 pb-6">
          <div className="bg-teal-50 text-teal-600 p-3 rounded-2xl border border-teal-100">
            <Activity size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Today's Protocol
            </h2>
            <p className="text-slate-500 font-medium">
              Goal:{" "}
              <span className="uppercase text-teal-700 font-bold">
                {workoutPlan.userGoal.replace("_", " ")}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {groupedExercises &&
            Object.keys(groupedExercises).map((category, idx) => (
              <div key={idx} className="animate-in fade-in duration-500">
                <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest border-l-4 border-teal-400 pl-4">
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {groupedExercises[category].map((ex, i) => (
                    <div
                      key={i}
                      className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-bold text-slate-900 leading-tight">
                          {ex.name}
                        </h4>
                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                          {ex.intensity} Intensity
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Repeat size={16} className="text-teal-500" />
                          {ex.rounds} Sets × {ex.reps}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Timer size={16} className="text-emerald-500" />
                          Rest: {ex.rest}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Flame size={16} className="text-orange-500" />
                          RPE: {ex.rpe}/10
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <TargetIcon size={16} className="text-blue-500" />
                          {ex.target}
                        </div>
                      </div>

                      {ex.instructions && (
                        <p className="text-slate-500 text-sm font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <strong className="text-slate-700">Form cue:</strong>{" "}
                          {ex.instructions}
                        </p>
                      )}

                      {ex.note && (
                        <div className="mt-4 bg-amber-50/80 p-4 rounded-xl border border-amber-100 flex gap-3 items-start">
                          <AlertCircle
                            size={18}
                            className="text-amber-500 shrink-0 mt-0.5"
                          />
                          <p className="text-amber-800 text-xs font-bold leading-relaxed">
                            {ex.note}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Exercise;
