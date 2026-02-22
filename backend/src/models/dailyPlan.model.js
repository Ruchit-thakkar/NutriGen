const mongoose = require("mongoose");

// Schema for individual food/drink items logged
const consumedItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  time: { type: Date, default: Date.now },
});

const dailyPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateString: { type: String, required: true }, // Format: "YYYY-MM-DD"

    targets: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      sleep: { type: Number, default: 0 },
    },

    actuals: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      sleep: { type: Number, default: 0 },
    },

    consumedItems: [consumedItemSchema],
  },
  { timestamps: true },
);

// Ensure a user can only have ONE plan per specific date
dailyPlanSchema.index({ user: 1, dateString: 1 }, { unique: true });

// 🟢 CRITICAL FIX: The 3rd argument "dailyPlans_v2" forces MongoDB to create a
// brand new collection, completely ignoring the old "Ghost Index" duplicate key errors!
module.exports = mongoose.model("DailyPlan", dailyPlanSchema, "dailyPlans_v2");
