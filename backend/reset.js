const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DailyPlan = require("./src/models/dailyLog.model"); // 👉 Check your exact file name! Could be dailyPlan.model.js
const connectTodb = require("./src/db/db");

dotenv.config();

const resetPlans = async () => {
  try {
    // This deletes ALL saved daily plans so the AI starts fresh
    await DailyPlan.deleteMany({});
    console.log("🗑️ All old daily plans deleted!");
    console.log("✅ Go to your browser and click 'Generate Today's Plan'!");

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

connectTodb();
mongoose.connection.once("open", () => {
  resetPlans();
});
