const DailyPlan = require("../models/dailyPlan.model");

exports.getWeeklyProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Generate an array of the last 7 dates (YYYY-MM-DD)
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }

    // 2. Fetch all plans for this user that fall within those 7 days
    const plans = await DailyPlan.find({
      user: userId,
      dateString: { $in: dates },
    });

    // 3. Format the data for the frontend charts
    const weeklyData = dates.map((date) => {
      // Find the plan for this specific date
      const plan = plans.find((p) => p.dateString === date);

      // Get the short day name (e.g., "Mon", "Tue") for the X-axis
      const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      return {
        date,
        day: dayName,
        // If a plan exists, use its data. Otherwise, default to 0s.
        actuals: plan
          ? plan.actuals
          : { calories: 0, protein: 0, carbs: 0, fats: 0, water: 0, sleep: 0 },
        targets: plan
          ? plan.targets
          : { calories: 0, protein: 0, carbs: 0, fats: 0, water: 0, sleep: 0 },
      };
    });

    res.status(200).json({ success: true, weeklyData });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching progress" });
  }
};
// Add this to controllers/progress.controller.js

exports.getFilteredProgress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { timeframe = "week", metric = "calories" } = req.query;

    // 1. Determine date range
    let daysToFetch = 7;
    if (timeframe === "month") daysToFetch = 30;
    if (timeframe === "year") daysToFetch = 365;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysToFetch);
    const startDateString = startDate.toISOString().split("T")[0];

    // 2. Fetch plans
    const plans = await DailyPlan.find({
      user: userId,
      dateString: { $gte: startDateString },
    }).sort({ dateString: 1 });

    // 3. Format data for the graph
    const chartData = plans.map((p) => ({
      date:
        timeframe === "year" ? p.dateString.slice(0, 7) : p.dateString.slice(5), // YYYY-MM for year, MM-DD for others
      Actual: p.actuals[metric] || 0,
      Target: p.targets[metric] || 0,
    }));

    // Group by month if it's a yearly view to keep the graph clean
    let finalChartData = chartData;
    if (timeframe === "year") {
      const monthlyData = {};
      chartData.forEach((d) => {
        if (!monthlyData[d.date]) {
          monthlyData[d.date] = {
            date: d.date,
            Actual: 0,
            Target: 0,
            count: 0,
          };
        }
        monthlyData[d.date].Actual += d.Actual;
        monthlyData[d.date].Target += d.Target;
        monthlyData[d.date].count += 1;
      });
      // Convert to averages for the month
      finalChartData = Object.values(monthlyData).map((m) => ({
        date: m.date,
        Actual: Math.round(m.Actual / m.count),
        Target: Math.round(m.Target / m.count),
      }));
    }

    // 4. Generate Automated Insight (Compare 1st half of timeframe to 2nd half)
    let insightText = `Not enough data to analyze ${metric} trends yet. Keep logging!`;

    if (plans.length > 3) {
      const midpoint = Math.floor(plans.length / 2);
      const firstHalf = plans.slice(0, midpoint);
      const secondHalf = plans.slice(midpoint);

      const getAvg = (arr) =>
        arr.reduce((sum, p) => sum + (p.actuals[metric] || 0), 0) / arr.length;

      const firstAvg = getAvg(firstHalf);
      const secondAvg = getAvg(secondHalf);
      const diff = secondAvg - firstAvg;
      const percentChange = firstAvg > 0 ? (diff / firstAvg) * 100 : 0;

      const metricName = metric.charAt(0).toUpperCase() + metric.slice(1);

      if (Math.abs(percentChange) <= 5) {
        insightText = `Your ${metricName} intake has been highly consistent over this ${timeframe}.`;
      } else if (percentChange > 5) {
        insightText = `${metricName} intake is trending UP by ${Math.round(percentChange)}% recently.`;
      } else {
        insightText = `${metricName} intake is trending DOWN by ${Math.round(Math.abs(percentChange))}% recently.`;
      }
    }

    res.status(200).json({
      success: true,
      data: finalChartData,
      insight: insightText,
    });
  } catch (error) {
    console.error("Filter error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching filtered data" });
  }
};
