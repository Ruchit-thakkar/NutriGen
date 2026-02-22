const express = require("express");
const app = express();
const cors = require("cors");
const connectTodb = require("./db/db");
connectTodb();
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const dailyPlanRoutes = require("./routes/dailyPlan.routes");

// Connect the routes to the app
app.use(cookieParser());
app.use(
  cors({
    // 1. Check your frontend port!
    // Your error says "localhost:3000", so ensure this matches.
    origin: ["http://localhost:5173", "http://localhost:3000"],

    credentials: true,

    // 2. ADD "PATCH" TO THIS LIST 👇
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Existing Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/dailyPlan", dailyPlanRoutes);
app.use("/api/progress", require("./routes/progress.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/user", require("./routes/user.routes"));

// --- NEW NutriGen Routes ---
app.use("/api/exercises", require("./routes/exercise.routes")); // 👈 Added Exercise routes
app.use("/api/food", require("./routes/food.routes")); // 👈 Added Food routes

// 2. Connect it at the bottom with your other app.use statements
module.exports = app;
