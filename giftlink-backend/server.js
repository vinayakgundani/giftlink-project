// giftlink-backend/server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// IMPORTANT for Render — NO FALLBACK
const PORT = process.env.PORT;  

// Connect DB
connectDB();

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Handling
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({
  origin: FRONTEND_URL === "*" ? "*" : FRONTEND_URL,
  optionsSuccessStatus: 200
}));

// Health Check (Render uses this sometimes)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Routes
app.use("/api/gifts", require("./routes/giftRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend running on Render PORT = ${PORT}`);
});
