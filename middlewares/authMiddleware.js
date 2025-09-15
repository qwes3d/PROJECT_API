const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// Verify JWT
const protectJWT = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Verify password for update & delete
const confirmPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password confirmation required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { protectJWT, confirmPassword };
