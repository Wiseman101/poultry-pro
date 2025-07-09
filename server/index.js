const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("🐔 Poultry backend is running...");
});

const authRoutes = require("./routes/authRoutes");

// After app.use(express.json())
app.use("/api/auth", authRoutes);

const birdRoutes = require("./routes/birdRoutes");

// After authRoutes
app.use("/api/birds", birdRoutes);

const chickenRoutes = require('./routes/chickenRoutes')
app.use('/api/chickens', chickenRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
