const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

// GET /api/food/suggest?date=YYYY-MM-DD
router.get("/suggest", authMiddleware, foodController.suggestMeals);

module.exports = router;
