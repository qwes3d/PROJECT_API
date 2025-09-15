const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc Register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      // Set JWT as HttpOnly cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      res.json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Logout
exports.logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
};
