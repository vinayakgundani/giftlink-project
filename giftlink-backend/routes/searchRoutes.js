const express = require("express");
const router = express.Router();
const Gift = require("../models/Gift");

/**
 * GET /api/search?category=toys
 * Filters gifts based on category
 */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    // If category query is present, filter by it
    if (category) {
      const gifts = await Gift.find({ category });
      return res.status(200).json(gifts);
    }

    // If no category provided, return all gifts
    const gifts = await Gift.find();
    res.status(200).json(gifts);

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;
