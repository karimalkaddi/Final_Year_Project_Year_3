import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// =======================
// GET profile
// =======================
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// UPDATE name
// =======================
router.put("/", async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);
    user.name = name;
    await user.save();

    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// CHANGE PASSWORD
// =======================
router.put("/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
