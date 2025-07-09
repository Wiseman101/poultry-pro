const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["chicken", "duck", "quail", "turkey", "other"],
    default: "chicken"
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  eggsPerDay: {
    type: Number,
    default: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Bird", birdSchema);
