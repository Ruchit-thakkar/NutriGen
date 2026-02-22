const Profile = require("../models/profile.model");
const DailyPlan = require("../models/dailyPlan.model");

class FoodService {
  async getSuggestedMeals(userId, dateString) {
    const profile = await Profile.findOne({ user: userId });
    const dailyPlan = await DailyPlan.findOne({ user: userId, dateString });

    if (!profile) throw new Error("User profile not found.");

    const region =
      profile.basic.regionFoodPreference?.toLowerCase() || "global";
    const medicalConditions = profile.health.medicalConditions || [];
    const allergies = profile.health.allergies || [];

    let mealMenu = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    };

    // 1. Generate a Wealth of Regional Options
    if (region === "indian") {
      mealMenu.breakfast.push(
        {
          name: "High-Protein Moong Dal Chilla",
          prepTime: "15 mins",
          macros: { cal: 320, pro: 18, carb: 40, fat: 8 },
          ingredients: ["100g Moong Dal", "50g Paneer (grated)", "Spinach"],
          tags: ["Vegetarian"],
        },
        {
          name: "Egg Bhurji with Multigrain Roti",
          prepTime: "10 mins",
          macros: { cal: 380, pro: 22, carb: 35, fat: 14 },
          ingredients: ["3 Whole Eggs", "1 Roti", "Onions & Tomatoes"],
          tags: ["High Protein"],
        },
        {
          name: "Overnight Oats with Chia & Cardamom",
          prepTime: "5 mins (prev night)",
          macros: { cal: 300, pro: 12, carb: 45, fat: 9 },
          ingredients: ["50g Oats", "200ml Almond Milk", "10g Chia Seeds"],
          tags: ["Vegan", "High Fiber"],
        },
      );
      mealMenu.lunch.push(
        {
          name: "Soya Chunk Curry with Brown Rice",
          prepTime: "30 mins",
          macros: { cal: 450, pro: 45, carb: 55, fat: 5 },
          ingredients: ["50g Soya Chunks", "100g Brown Rice", "Tomato Gravy"],
          tags: ["Vegan", "High Protein"],
        },
        {
          name: "Grilled Chicken Tikka Bowl",
          prepTime: "25 mins",
          macros: { cal: 520, pro: 48, carb: 40, fat: 16 },
          ingredients: ["200g Chicken Breast", "Mint Yogurt", "Cucumber Salad"],
          tags: ["Low Carb"],
        },
      );
      // ... populate dinner and snacks
    } else {
      // Mediterranean / Global Defaults
      mealMenu.breakfast.push(
        {
          name: "Greek Yogurt Parfait",
          prepTime: "5 mins",
          macros: { cal: 300, pro: 25, carb: 30, fat: 5 },
          ingredients: ["200g 0% Greek Yogurt", "Mixed Berries", "15g Walnuts"],
          tags: ["Vegetarian", "Probiotic"],
        },
        {
          name: "Smoked Salmon Bagel Thins",
          prepTime: "10 mins",
          macros: { cal: 350, pro: 22, carb: 35, fat: 12 },
          ingredients: [
            "1 Whole Wheat Bagel Thin",
            "50g Smoked Salmon",
            "Light Cream Cheese",
          ],
          tags: ["Pescatarian"],
        },
      );
      mealMenu.lunch.push(
        {
          name: "Turkey & Avocado Wrap",
          prepTime: "10 mins",
          macros: { cal: 480, pro: 35, carb: 40, fat: 18 },
          ingredients: [
            "150g Turkey Breast",
            "1 Whole Wheat Tortilla",
            "1/4 Avocado",
          ],
          tags: ["High Protein"],
        },
        {
          name: "Quinoa Superfood Salad",
          prepTime: "15 mins",
          macros: { cal: 420, pro: 15, carb: 55, fat: 14 },
          ingredients: ["100g Quinoa", "Edamame", "Balsamic Vinaigrette"],
          tags: ["Vegan", "High Fiber"],
        },
      );
    }

    // 2. Extreme Precision: Allergy & Medical Filtering
    const filterAllergies = (mealArray) => {
      return mealArray.map((meal) => {
        if (
          allergies.includes("dairy") &&
          (meal.name.toLowerCase().includes("yogurt") ||
            meal.name.toLowerCase().includes("paneer"))
        ) {
          return {
            ...meal,
            name: meal.name + " (Use Dairy-Free Alternative)",
            macros: { ...meal.macros, pro: meal.macros.pro - 5 },
            note: "Substituted core ingredient due to dairy allergy.",
          };
        }
        return meal;
      });
    };

    mealMenu.breakfast = filterAllergies(mealMenu.breakfast);
    mealMenu.lunch = filterAllergies(mealMenu.lunch);

    // 3. Dynamic Daily Target Adjustments
    if (dailyPlan && dailyPlan.targets.calories > 0) {
      const remainingCals =
        dailyPlan.targets.calories - dailyPlan.actuals.calories;

      // If the user has heavily over-eaten by lunchtime, flag high-calorie dinners
      if (remainingCals < 400 && remainingCals > 0) {
        mealMenu.dinner = mealMenu.dinner.map((meal) => {
          if (meal.macros.cal > remainingCals) {
            return {
              ...meal,
              note: `⚠️ Halve the portion size of this meal to stay within your remaining ${remainingCals} calories.`,
            };
          }
          return meal;
        });
      }
    }

    return {
      dietaryRegion: region,
      date: dateString,
      menu: mealMenu, // Returning the structured object of arrays
    };
  }
}

module.exports = new FoodService();
