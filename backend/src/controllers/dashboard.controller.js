const DailyPlan = require("../models/dailyPlan.model");
const Profile = require("../models/profile.model");

exports.getFullDashboard = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // 1. Fetch Profile
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(200).json({ success: true, profile: null });
    }

    // 2. Fetch ALL Plans (Sorted oldest to newest for graphing)
    const allPlans = await DailyPlan.find({ user: userId }).sort({
      dateString: 1,
    });

    // Helper function to calculate stats and chart data
    const generateMetrics = (plans) => {
      let totalCalActual = 0,
        totalCalTarget = 0;

      const chartData = plans.map((p) => {
        totalCalActual += p.actuals.calories || 0;
        totalCalTarget += p.targets.calories || 0;

        return {
          date: p.dateString.slice(5), // Formats "YYYY-MM-DD" to just "MM-DD"
          Actual: p.actuals.calories || 0,
          Target: p.targets.calories || 0,
        };
      });

      const daysTracked = plans.length || 1; // Prevent divide by zero

      return {
        chartData,
        daysTracked: plans.length,
        totals: {
          calActual: totalCalActual,
          calTarget: totalCalTarget,
        },
        averages: {
          calActual: Math.round(totalCalActual / daysTracked),
        },
        // Calculate the overall percentage achieved vs target
        percentage:
          totalCalTarget > 0
            ? Math.round((totalCalActual / totalCalTarget) * 100)
            : 0,
      };
    };

    // 3. Filter 30-Day Data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDayString = thirtyDaysAgo.toISOString().split("T")[0];

    const thirtyDayPlans = allPlans.filter(
      (p) => p.dateString >= thirtyDayString,
    );

    // 4. Send the combined package back to React!
    res.status(200).json({
      success: true,
      profile,
      thirtyDay: generateMetrics(thirtyDayPlans),
      lifetime: generateMetrics(allPlans),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching dashboard" });
  }
};
