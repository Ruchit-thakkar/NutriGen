const Profile = require("../models/profile.model");
const DailyPlan = require("../models/dailyPlan.model");

class ExerciseService {
  async getSuggestedExercises(userId, dateString) {
    const profile = await Profile.findOne({ user: userId });
    const dailyPlan = await DailyPlan.findOne({ user: userId, dateString });

    if (!profile)
      throw new Error("User profile not found. Please complete your profile.");

    const goal = profile.goals.primaryGoal || "maintain";
    let exerciseMenu = [];

    // 1. Generate a Wealth of Base Options
    switch (goal) {
      case "muscle_gain":
      case "recomposition":
        exerciseMenu = [
          // Warm-ups (Give them choices)
          {
            category: "Warm-up",
            name: "Dynamic Mobility Flow",
            rounds: 1,
            reps: "5 mins continuous",
            rest: "None",
            rpe: 3,
            target: "Full Body",
            intensity: "Low",
          },
          {
            category: "Warm-up",
            name: "Jump Rope / Light Jog",
            rounds: 1,
            reps: "5-7 mins continuous",
            rest: "None",
            rpe: 4,
            target: "Cardiovascular",
            intensity: "Low",
          },

          // Primary Heavy Options (The core workout)
          {
            category: "Primary Strength",
            name: "Barbell Back Squat",
            rounds: 4,
            reps: "8 reps per round",
            rest: "120 seconds",
            rpe: 8,
            target: "Quads, Glutes",
            intensity: "High",
            instructions:
              "Brace core tight before descending. Drive through the mid-foot.",
          },
          {
            category: "Primary Strength",
            name: "Dumbbell Bulgarian Split Squats",
            rounds: 3,
            reps: "10 reps per leg per round",
            rest: "90 seconds",
            rpe: 8,
            target: "Quads, Glutes",
            intensity: "High",
            instructions: "Keep torso slightly forward to bias the glutes.",
          },

          // Secondary / Hypertrophy Options
          {
            category: "Hypertrophy Accessory",
            name: "Romanian Deadlifts (RDL)",
            rounds: 3,
            reps: "12 reps per round",
            rest: "90 seconds",
            rpe: 7,
            target: "Hamstrings",
            intensity: "Moderate",
            instructions:
              "Hinge at the hips, keep dumbbells close to your shins.",
          },
          {
            category: "Hypertrophy Accessory",
            name: "Leg Press",
            rounds: 3,
            reps: "15 reps per round",
            rest: "90 seconds",
            rpe: 8,
            target: "Quads",
            intensity: "Moderate",
            instructions:
              "Control the eccentric (downward) phase for 3 seconds.",
          },

          // Finishers / Cardio choices
          {
            category: "Finisher",
            name: "Sled Push / Heavy Carries",
            rounds: 4,
            reps: "20 meters per round",
            rest: "60 seconds",
            rpe: 9,
            target: "Full Body Conditioning",
            intensity: "Maximum",
            instructions: "Keep strides short and powerful.",
          },
          {
            category: "Finisher",
            name: "Incline Treadmill Walk",
            rounds: 1,
            reps: "15 mins continuous",
            rest: "None",
            rpe: 6,
            target: "Cardiovascular",
            intensity: "Moderate",
            instructions: "Set incline to 12% and speed to 3 mph.",
          },
        ];
        break;

      case "fat_loss":
        exerciseMenu = [
          // Give them structured fat-loss choices
          {
            category: "Warm-up",
            name: "Jumping Jacks & High Knees",
            rounds: 3,
            reps: "30 seconds each per round",
            rest: "30 seconds",
            rpe: 5,
            target: "Full Body",
            intensity: "Moderate",
          },
          {
            category: "HIIT Circuit (Option A)",
            name: "Kettlebell Swings",
            rounds: 5,
            reps: "20 reps per round",
            rest: "45 seconds",
            rpe: 8,
            target: "Posterior Chain",
            intensity: "High",
          },
          {
            category: "HIIT Circuit (Option A)",
            name: "Burpees",
            rounds: 5,
            reps: "15 reps per round",
            rest: "60 seconds",
            rpe: 9,
            target: "Full Body",
            intensity: "Maximum",
          },
          {
            category: "LISS Cardio (Option B)",
            name: "Cycling / Rowing",
            rounds: 1,
            reps: "40 mins continuous",
            rest: "None",
            rpe: 5,
            target: "Cardiovascular",
            intensity: "Moderate",
          },
          {
            category: "Core Finisher",
            name: "Plank to Push-up",
            rounds: 3,
            reps: "12 reps per round",
            rest: "45 seconds",
            rpe: 7,
            target: "Core, Shoulders",
            intensity: "Moderate",
          },
        ];
        break;

      // ... (Add maintain/endurance branches with equal depth)
    }

    // 2. Extreme Detail: Dynamic Adjustments
    if (dailyPlan) {
      const { sleep } = dailyPlan.actuals;

      // If sleep is compromised, we heavily penalize the RPE and intensity
      if (sleep > 0 && sleep < 6) {
        exerciseMenu = exerciseMenu.map((ex) => {
          if (ex.intensity === "Maximum" || ex.intensity === "High") {
            return {
              ...ex,
              rounds: Math.max(1, ex.rounds - 1), // Drop a set
              rpe: Math.max(1, ex.rpe - 2), // Drop the target exertion
              note: "⚠️ CNS Protection: Because you slept under 6 hours, we have reduced your required rounds and exertion level for this exercise to prevent injury.",
            };
          }
          return ex;
        });
      }
    }

    return {
      userGoal: goal,
      date: dateString,
      exercises: exerciseMenu,
    };
  }
}

module.exports = new ExerciseService();
