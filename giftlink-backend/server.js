// giftlink-backend/server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Basic middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow only FRONTEND_URL (or all if not set)
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({
  origin: FRONTEND_URL === "*" ? "*" : FRONTEND_URL,
  optionsSuccessStatus: 200
}));

// Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Routes
app.use("/api/gifts", require("./routes/giftRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

// Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
