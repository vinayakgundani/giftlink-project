// giftlink-backend/server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// --- Security / proxy (useful on platforms like Render) ---
app.set("trust proxy", 1);

// --- Middleware ---
app.use(morgan("tiny")); // request logging
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse form submissions

// Configure CORS: allow only the frontend origin from env (safer than '*')
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const corsOptions = {
  origin: FRONTEND_URL === "*" ? "*" : FRONTEND_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// --- Basic health route ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Default root (small message)
app.get("/", (req, res) => {
  res.send("GiftLink Backend Running 🚀");
});

// --- API Routes ---
app.use("/api/gifts", require("./routes/giftRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// --- 404 fallback ---
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
