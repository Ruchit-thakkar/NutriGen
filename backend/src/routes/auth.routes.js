const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.post("/logout", authController.logoutController);
module.exports = router;
