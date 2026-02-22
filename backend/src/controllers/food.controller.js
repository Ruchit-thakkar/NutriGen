const FoodService = require("../services/food.service");

exports.suggestMeals = async (req, res) => {
  try {
    const userId = req.user.id;
    const dateString = req.query.date || new Date().toISOString().split("T")[0];

    const result = await FoodService.getSuggestedMeals(userId, dateString);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in suggestMeals:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate meal suggestions.",
    });
  }
};
