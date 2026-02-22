const mongoose = require("mongoose");
require("dotenv").config();

function connectTodb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully ✅");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB ❌", err);
    });
}

module.exports = connectTodb;
