const Gift = require("../models/Gift");

// ✅ PUBLIC: Get all gifts
exports.getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find().sort({ createdAt: -1 });
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gifts" });
  }
};

// ✅ PROTECTED: Add a new gift
exports.addGift = async (req, res) => {
  try {
    const { title, category, price, description } = req.body;

    if (!title || !category || !price || !description) {
      return res.status(400).json({
        message: "Title, category, price and description are required",
      });
    }

    const gift = new Gift({
      title,
      category,
      price,
      description,
    });

    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
