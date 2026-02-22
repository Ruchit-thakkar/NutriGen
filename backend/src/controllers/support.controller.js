const Ticket = require("../models/ticket.model");

// ==========================================
// USER ROUTES
// ==========================================

// 🟢 User: Submit a new query
exports.createTicket = async (req, res) => {
  try {
    const { message } = req.body;
    const newTicket = await Ticket.create({
      user: req.user._id,
      message,
    });
    res.status(201).json({ success: true, ticket: newTicket });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to submit query." });
  }
};

// 🟢 User: Get their own queries
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch queries." });
  }
};

// ==========================================
// ADMIN ROUTES
// ==========================================

// 🟢 Admin: Get all user queries
exports.getAllTickets = async (req, res) => {
  try {
    // Populate the user data so the admin can see their name and email
    const tickets = await Ticket.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all queries." });
  }
};

// 🟢 Admin: Reply to (or edit a reply on) a ticket
exports.replyToTicket = async (req, res) => {
  try {
    const { reply } = req.body;
    const ticketId = req.params.id;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        adminReply: reply,
        status: "replied",
      },
      { new: true },
    ).populate("user", "fullName email");

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to save reply." });
  }
};
