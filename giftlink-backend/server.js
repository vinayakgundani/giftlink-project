// Import dependencies
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();
const cors = require("cors");
app.use(cors());


// Middleware to parse JSON requests
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("GiftLink Backend Running 🚀");
});

// Import Routes
app.use("/api/gifts", require("./routes/giftRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
