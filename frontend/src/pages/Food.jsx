import React, { useState, useEffect } from "react";
import {
  Utensils,
  Flame,
  Wheat,
  Droplets,
  Activity,
  AlertCircle,
  Clock,
  ListChecks,
} from "lucide-react";
import api from "../utils/api";

const Food = () => {
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/food/suggest?date=${selectedDate}`,
        );
        if (data.success) setNutritionPlan(data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load nutrition plan.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [selectedDate]);

  if (loading)
    return (
      <div className="text-center py-10 text-slate-500 font-bold">
        Curating optimal macros...
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  // The backend now returns an object with arrays: { breakfast: [], lunch: [], dinner: [], snacks: [] }
  const { menu, dietaryRegion } = nutritionPlan;

  return (
    <div className="w-full relative z-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-200/60 pb-6">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl border border-emerald-100">
            <Utensils size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Nutrition Options
            </h2>
            <p className="text-slate-500 font-medium">
              Style:{" "}
              <span className="uppercase text-emerald-700 font-bold">
                {dietaryRegion}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {Object.entries(menu).map(([mealType, options]) => {
            if (!options || options.length === 0) return null;

            return (
              <div key={mealType} className="animate-in fade-in duration-500">
                <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest border-l-4 border-emerald-400 pl-4">
                  {mealType} Options
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {options.map((meal, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-slate-900 leading-tight">
                          {meal.name}
                        </h4>
                      </div>

                      <div className="flex gap-2 flex-wrap mb-4">
                        {meal.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-4">
                        <Clock size={14} /> Prep: {meal.prepTime}
                      </div>

                      {/* Deep Macros */}
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                          <Flame size={14} className="text-orange-400 mb-1" />
                          <span className="font-black text-slate-800 text-sm">
                            {meal.macros?.cal || meal.calories}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                          <Activity size={14} className="text-teal-500 mb-1" />
                          <span className="font-black text-slate-800 text-sm">
                            {meal.macros?.pro || meal.protein}g
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                          <Wheat size={14} className="text-amber-500 mb-1" />
                          <span className="font-black text-slate-800 text-sm">
                            {meal.macros?.carb || meal.carbs}g
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                          <Droplets size={14} className="text-blue-400 mb-1" />
                          <span className="font-black text-slate-800 text-sm">
                            {meal.macros?.fat || meal.fats}g
                          </span>
                        </div>
                      </div>

                      {/* Ingredients List */}
                      {meal.ingredients && (
                        <div className="mt-auto">
                          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                            <ListChecks size={14} /> Ingredients
                          </h5>
                          <ul className="text-sm text-slate-600 font-medium space-y-1 ml-1">
                            {meal.ingredients.map((ing, i) => (
                              <li key={i}>• {ing}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {meal.note && (
                        <div className="mt-4 bg-amber-50/80 p-3 rounded-xl border border-amber-100 flex gap-2 items-start">
                          <AlertCircle
                            size={16}
                            className="text-amber-500 shrink-0 mt-0.5"
                          />
                          <p className="text-amber-800 text-xs font-bold leading-relaxed">
                            {meal.note}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Food;
