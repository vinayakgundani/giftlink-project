const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");
const { register, login } = require("../controllers/authController");

// Existing routes (UNCHANGED)
router.post("/register", register);
router.post("/login", login);

/*
  Coursera Task 11 requirement:
  Demonstrates usage of collection.findOne()
*/
router.get("/current-user", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("users");

    // ✅ REQUIRED BY COURSERA
    const user = await collection.findOne({ email: req.query.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
