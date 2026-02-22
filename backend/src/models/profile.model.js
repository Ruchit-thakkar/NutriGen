const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    // Link this profile to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensures one user only has one profile
    },

    basic: {
      age: { type: Number },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      height: { type: Number }, // in cm
      weight: { type: Number }, // in kg
      bodyFat: { type: Number }, // percentage (optional)
      regionFoodPreference: { type: String }, // e.g., Indian, Korean, Mediterranean
    },

    lifestyle: {
      activityLevel: {
        type: String,
        enum: ["sedentary", "light", "moderate", "active", "athlete"],
      },
      stepsPerDay: { type: Number }, // optional
      jobType: { type: String, enum: ["desk", "field", "mixed"] },
    },

    goals: {
      primaryGoal: {
        type: String,
        enum: [
          "fat_loss",
          "muscle_gain",
          "recomposition",
          "maintain",
          "endurance",
        ],
      },
      targetWeight: { type: Number }, // optional
      timeline: { type: Number }, // in weeks
    },

    health: {
      medicalConditions: [{ type: String }], // e.g., ["diabetes", "thyroid"]
      allergies: [{ type: String }], // e.g., ["peanuts", "dairy"]
      medications: [{ type: String }],
      sleepTarget: { type: Number, default: 8 }, // in hours
      waterTarget: { type: Number, default: 3 }, // in liters
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", profileSchema);
