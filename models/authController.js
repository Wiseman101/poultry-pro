const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully 🚀" });
  } catch (err) {
    res.status(500).json({ message: "Server error 😢", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error 😢", error: err.message });
  }
};
