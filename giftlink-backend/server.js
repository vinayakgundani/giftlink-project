const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes ONLY
app.use("/api/gifts", require("./routes/giftRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
