const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 View engine (Frontend)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../giftlink-frontend/views"));
app.use(express.static(path.join(__dirname, "../giftlink-frontend/public")));

// 🔹 API Routes
app.use("/api/gifts", require("./routes/giftRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

// 🔹 Frontend Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/gifts", async (req, res) => {
  try {
    const response = await axios.get(
      `${req.protocol}://${req.get("host")}/api/gifts`
    );
    res.render("gifts", { gifts: response.data });
  } catch (err) {
    res.render("gifts", { gifts: [] });
  }
});

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
