const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/auth.middleware");

// Import Controllers
const {
  getOverviewData,
  getAllUsers,
  deleteUser,
  getGraphData,
} = require("../controllers/admin.controller");

const {
  getAllTickets,
  replyToTicket,
} = require("../controllers/support.controller");

// Middleware to restrict access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Not authorized as an admin" });
  }
};

// Existing Routes
router.get("/overview", authMiddleware, adminOnly, getOverviewData);
router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);
router.get("/graphs", authMiddleware, adminOnly, getGraphData);

// Support Ticket Routes
router.get("/support", authMiddleware, adminOnly, getAllTickets);
router.put("/support/:id", authMiddleware, adminOnly, replyToTicket);

module.exports = router;
