const DailyPlan = require("../models/dailyPlan.model");
const Profile = require("../models/profile.model");
const dailyService = require("../services/daily.service");

// Helper function to get today's date safely
const getTodayString = () => new Date().toISOString().split("T")[0];

// 🟢 1. FETCH PLAN (Checks if it exists)
exports.getDailyPlan = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const today = getTodayString();

    const plan = await DailyPlan.findOne({ user: userId, dateString: today });

    if (!plan) {
      // 404 Not Found -> Tells React to show the "Generate" button
      return res
        .status(404)
        .json({ success: false, message: "No plan generated for today." });
    }

    res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("Error fetching daily plan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 2. GENERATE PLAN (Triggered by button click)
exports.generateDailyPlan = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const today = getTodayString();

    // Prevent double-generation
    let plan = await DailyPlan.findOne({ user: userId, dateString: today });
    if (plan) {
      return res
        .status(400)
        .json({ success: false, message: "Plan already exists." });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile incomplete." });
    }

    // Call your AI/Math service
    const targets = dailyService.calculateDailyTargets(profile);

    plan = await DailyPlan.create({
      user: userId,
      dateString: today,
      targets: targets,
      actuals: {},
    });

    res.status(201).json({ success: true, plan });
  } catch (error) {
    console.error("Error generating daily plan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 3. UPDATE / LOG INTAKE
exports.updateDailyPlan = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const today = getTodayString();
    const { name, calories, protein, carbs, fats, water, sleep } = req.body;

    const newItem = {
      name: name || "Quick Log",
      calories: calories || 0,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
    };

    const updatedPlan = await DailyPlan.findOneAndUpdate(
      { user: userId, dateString: today },
      {
        $inc: {
          "actuals.calories": newItem.calories,
          "actuals.protein": newItem.protein,
          "actuals.carbs": newItem.carbs,
          "actuals.fats": newItem.fats,
          "actuals.water": water || 0,
          "actuals.sleep": sleep || 0,
        },
        $push: { consumedItems: newItem },
      },
      { new: true },
    );

    if (!updatedPlan) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Please generate today's plan first.",
        });
    }

    res.status(200).json({ success: true, plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 4. DELETE LOGGED ITEM
exports.deleteLogItem = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const today = getTodayString();
    const { itemId } = req.params;

    const plan = await DailyPlan.findOne({ user: userId, dateString: today });
    if (!plan)
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });

    const itemToDelete = plan.consumedItems.id(itemId);
    if (!itemToDelete)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    // Subtract the macros back out of the daily total
    plan.actuals.calories -= itemToDelete.calories;
    plan.actuals.protein -= itemToDelete.protein;
    plan.actuals.carbs -= itemToDelete.carbs;
    plan.actuals.fats -= itemToDelete.fats;

    plan.consumedItems.pull(itemId);
    await plan.save();

    res.status(200).json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
