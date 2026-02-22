const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const authMiddleware = require("../Middlewares/auth.middleware"); // Note the lowercase 'm' in middlewares (standard practice)

// All routes here are protected by authMiddleware
router.get("/get", authMiddleware, profileController.getProfile);
router.post("/update", authMiddleware, profileController.updateProfile);

module.exports = router;
