import express from "express";
import Expense from "../models/Expense.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    // ✅ ONLY THIS USER'S EXPENSES
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: 1,
    });

    if (expenses.length === 0) {
      return res.json({
        history: [],
        prediction: [],
      });
    }

    // -------------------------
    // Build daily totals
    // -------------------------
    const dailyTotals = {};
    expenses.forEach((e) => {
      const day = new Date(e.date).toISOString().split("T")[0];
      dailyTotals[day] = (dailyTotals[day] || 0) + e.amount;
    });

    const history = Object.values(dailyTotals);

    // -------------------------
    // Simple forecast (average)
    // -------------------------
    const avg =
      history.reduce((a, b) => a + b, 0) / history.length;

    const prediction = Array(7).fill(Number(avg.toFixed(2)));

    res.json({
      history,
      prediction,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
