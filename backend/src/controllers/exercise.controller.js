const ExerciseService = require("../services/exercise.service");

exports.suggestExercises = async (req, res) => {
  try {
    // Assuming `req.user.id` is set by your authentication middleware
    const userId = req.user.id;

    // Fallback to today's date if the frontend doesn't provide one in the query params
    const dateString = req.query.date || new Date().toISOString().split("T")[0];

    const result = await ExerciseService.getSuggestedExercises(
      userId,
      dateString,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in suggestExercises:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate exercise suggestions.",
    });
  }
};
