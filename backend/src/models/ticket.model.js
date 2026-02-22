const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    adminReply: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "replied"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ticket", ticketSchema);
