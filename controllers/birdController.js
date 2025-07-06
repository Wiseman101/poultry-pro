const Bird = require("../models/Bird");


exports.addBird = async (req, res) => {
  try {
    const { type, quantity, eggsPerDay, notes } = req.body;

    const newBird = new Bird({
      type,
      quantity,
      eggsPerDay,
      notes,
      owner: req.user
    });

    const saved = await newBird.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error 🐔", error: err.message });
  }
};


exports.getBirds = async (req, res) => {
  try {
    const birds = await Bird.find({ owner: req.user }).sort({ createdAt: -1 });
    res.json(birds);
  } catch (err) {
    res.status(500).json({ message: "Server error 🐦", error: err.message });
  }
};


exports.deleteBird = async (req, res) => {
  try {
    const bird = await Bird.findOneAndDelete({
      _id: req.params.id,
      owner: req.user
    });

    if (!bird) {
      return res.status(404).json({ message: "Bird not found 🕊️" });
    }

    res.json({ message: "Bird deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bird", error: err.message });
  }
};
