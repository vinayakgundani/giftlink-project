const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getGifts, addGift } = require("../controllers/giftController");

// ✅ PUBLIC: View all gifts (before login)
router.get("/", getGifts);

// ✅ PROTECTED: Add gift (after login only)
router.post("/", auth, addGift);

module.exports = router;
