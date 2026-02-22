const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

// Make sure this says "/full" and points to "getFullDashboard"
router.get("/full", authMiddleware, dashboardController.getFullDashboard);

module.exports = router;
