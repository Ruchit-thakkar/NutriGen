const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },

    // 🥗 CATEGORIZATION
    dietType: {
      type: String,
      enum: ["veg", "non-veg", "vegan"], // Lowercase to easily match algorithm logic
      required: true,
    },
    mealType: [
      {
        type: String,
        enum: ["Breakfast", "Lunch", "Snack", "Dinner"], // Capitalized to match UI and seed data
        required: true,
      },
    ],
    cuisine: {
      type: String,
      required: true, // e.g., "Indian", "Continental", "Asian"
    },

    // 🏥 HEALTH FILTERS (The AI engine uses these to hide unsafe foods)
    allergens: [
      {
        type: String, // e.g., "Peanut", "Dairy", "Gluten", "Soy"
      },
    ],
    diseaseRestrictions: [
      {
        type: String, // e.g., "Diabetes", "PCOS", "High Cholesterol"
      },
    ],

    // 👤 OWNERSHIP
    // If userId is null, it means it's a "Global" food from our seed.js that everyone can see.
    // If it has a userId, it means a specific user added their own custom recipe.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Food", foodSchema);
