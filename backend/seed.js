const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Food = require("./src/models/food.model"); // Adjust the path to your food.model.js if needed

dotenv.config();

// Put your MongoDB connection string here if it's not in your .env
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nutrigen";

const seedFoods = [
  // 🌅 BREAKFAST
  {
    name: "Oatmeal with Almonds & Berries",
    calories: 350,
    protein: 12,
    carbs: 50,
    fat: 10,
    dietType: "vegan",
    mealType: ["Breakfast", "Snack"],
    cuisine: "Global",
  },
  {
    name: "Masala Poha",
    calories: 250,
    protein: 5,
    carbs: 45,
    fat: 8,
    dietType: "vegan",
    mealType: ["Breakfast", "Snack"],
    cuisine: "Indian",
  },
  {
    name: "Scrambled Eggs & Whole Wheat Toast",
    calories: 320,
    protein: 20,
    carbs: 30,
    fat: 15,
    dietType: "non-veg",
    mealType: ["Breakfast"],
    cuisine: "Continental",
  },
  {
    name: "Paneer Paratha with Yogurt",
    calories: 450,
    protein: 18,
    carbs: 55,
    fat: 18,
    dietType: "veg",
    mealType: ["Breakfast", "Lunch"],
    cuisine: "Indian",
  },

  // ☀️ LUNCH
  {
    name: "Grilled Chicken Breast with Quinoa",
    calories: 550,
    protein: 50,
    carbs: 40,
    fat: 15,
    dietType: "non-veg",
    mealType: ["Lunch", "Dinner"],
    cuisine: "Continental",
  },
  {
    name: "Dal Tadka, Rice & Bhindi Sabzi",
    calories: 600,
    protein: 18,
    carbs: 85,
    fat: 15,
    dietType: "veg",
    mealType: ["Lunch", "Dinner"],
    cuisine: "Indian",
  },
  {
    name: "Chickpea (Chole) Salad Bowl",
    calories: 400,
    protein: 15,
    carbs: 55,
    fat: 12,
    dietType: "vegan",
    mealType: ["Lunch"],
    cuisine: "Global",
  },
  {
    name: "Tofu Stir-fry with Brown Rice",
    calories: 480,
    protein: 22,
    carbs: 60,
    fat: 16,
    dietType: "vegan",
    mealType: ["Lunch", "Dinner"],
    cuisine: "Asian",
  },

  // 🍎 SNACKS
  {
    name: "Greek Yogurt with Honey",
    calories: 150,
    protein: 15,
    carbs: 20,
    fat: 0,
    dietType: "veg",
    mealType: ["Snack", "Breakfast"],
    cuisine: "Global",
  },
  {
    name: "Roasted Makhana (Fox Nuts)",
    calories: 120,
    protein: 3,
    carbs: 20,
    fat: 4,
    dietType: "vegan",
    mealType: ["Snack"],
    cuisine: "Indian",
  },
  {
    name: "Whey Protein Shake",
    calories: 120,
    protein: 25,
    carbs: 3,
    fat: 1,
    dietType: "veg",
    mealType: ["Snack"],
    cuisine: "Global",
  },
  {
    name: "Handful of Mixed Nuts",
    calories: 200,
    protein: 5,
    carbs: 8,
    fat: 18,
    dietType: "vegan",
    mealType: ["Snack"],
    cuisine: "Global",
  },

  // 🌙 DINNER
  {
    name: "Baked Salmon with Asparagus",
    calories: 450,
    protein: 40,
    carbs: 10,
    fat: 25,
    dietType: "non-veg",
    mealType: ["Dinner"],
    cuisine: "Continental",
  },
  {
    name: "Palak Paneer with 2 Rotis",
    calories: 500,
    protein: 20,
    carbs: 45,
    fat: 25,
    dietType: "veg",
    mealType: ["Dinner"],
    cuisine: "Indian",
  },
  {
    name: "Lentil Soup (Moong Dal) & Salad",
    calories: 300,
    protein: 18,
    carbs: 40,
    fat: 5,
    dietType: "vegan",
    mealType: ["Dinner", "Lunch"],
    cuisine: "Indian",
  },
  {
    name: "Chicken Tikka Wraps",
    calories: 550,
    protein: 35,
    carbs: 50,
    fat: 18,
    dietType: "non-veg",
    mealType: ["Dinner", "Lunch"],
    cuisine: "Indian",
  },
];

const runSeeder = async () => {
  try {
    console.log("⏳ Connecting to Database...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database Connected!");

    console.log("🧹 Clearing old foods...");
    await Food.deleteMany({}); // Wipe out any old test data

    console.log("🌱 Planting new recipes...");
    await Food.insertMany(seedFoods);

    console.log("🎉 Success! Added 16 new foods to the database.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

runSeeder();
