// services/daily.service.js

exports.calculateDailyTargets = (profile) => {
  const { basic, lifestyle, goals, health } = profile;

  // 1. Calculate BMR (Mifflin-St Jeor Equation)
  let bmr = 10 * basic.weight + 6.25 * basic.height - 5 * basic.age;
  bmr = basic.gender === "Male" ? bmr + 5 : bmr - 161;

  // 2. Calculate TDEE (Activity Multipliers)
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9,
  };
  const tdee = bmr * (activityMultipliers[lifestyle.activityLevel] || 1.2);

  // 3. Adjust for Goals (Caloric Target)
  let targetCalories = tdee;
  if (goals.primaryGoal === "fat_loss") targetCalories -= 500;
  if (goals.primaryGoal === "muscle_gain") targetCalories += 300;
  // maintain/recomposition/endurance stay close to TDEE

  // 4. Calculate Macros
  // Protein: ~2g per kg of bodyweight
  const targetProtein = basic.weight * 2;
  // Fats: ~0.8g per kg of bodyweight
  const targetFats = basic.weight * 0.8;

  // Carbs: The remaining calories
  // (Protein = 4 kcal/g, Fat = 9 kcal/g, Carbs = 4 kcal/g)
  const proteinCals = targetProtein * 4;
  const fatCals = targetFats * 9;
  const remainingCals = targetCalories - (proteinCals + fatCals);
  const targetCarbs = Math.max(0, remainingCals / 4);

  return {
    calories: Math.round(targetCalories),
    protein: Math.round(targetProtein),
    carbs: Math.round(targetCarbs),
    fats: Math.round(targetFats),
    water: health.waterTarget || 3,
    sleep: health.sleepTarget || 8,
  };
};
