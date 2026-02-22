const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/auth.middleware");

const {
  createTicket,
  getUserTickets,
} = require("../controllers/support.controller");

// User Support Routes
router.post("/support", authMiddleware, createTicket);
router.get("/support", authMiddleware, getUserTickets);

module.exports = router;
