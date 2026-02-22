const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

router.get("/weekly", authMiddleware, progressController.getWeeklyProgress);

// 🟢 DID YOU ADD THIS LINE?
router.get("/filter", authMiddleware, progressController.getFilteredProgress);

module.exports = router;
