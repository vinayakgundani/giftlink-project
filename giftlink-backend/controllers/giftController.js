const Gift = require("../models/Gift");

// GET all gifts
exports.getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new gift
exports.addGift = async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
