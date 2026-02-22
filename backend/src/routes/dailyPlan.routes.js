const express = require("express");
const router = express.Router();
const dailyPlanController = require("../controllers/dailyPlan.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

// 1. Initial Load Check
router.get("/today", authMiddleware, dailyPlanController.getDailyPlan);

// 2. Generate Plan Button
router.post("/generate", authMiddleware, dailyPlanController.generateDailyPlan);

// 3. Log Food/Water/Sleep
router.post("/log", authMiddleware, dailyPlanController.updateDailyPlan);

// 4. Delete Logged Item
router.delete(
  "/log/:itemId",
  authMiddleware,
  dailyPlanController.deleteLogItem,
);

module.exports = router;
