const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addBird,
  getBirds,
  deleteBird
} = require("../controllers/birdController");

// 🐥 Add new bird
router.post("/", authMiddleware, addBird);

// 📥 Get all birds of logged-in user
router.get("/", authMiddleware, getBirds);

// ❌ Delete a bird
router.delete("/:id", authMiddleware, deleteBird);

module.exports = router;
