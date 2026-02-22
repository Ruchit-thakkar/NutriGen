const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exercise.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
// Assuming you have an auth middleware

// GET /api/exercises/suggest?date=YYYY-MM-DD
router.get("/suggest", authMiddleware, exerciseController.suggestExercises);

module.exports = router;
