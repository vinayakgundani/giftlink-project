const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getGifts, addGift } = require("../controllers/giftController");

// GET all gifts (PROTECTED)
router.get("/", auth, getGifts);

// Add a gift (PROTECTED)
router.post("/", auth, addGift);

module.exports = router;
