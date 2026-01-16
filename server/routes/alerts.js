import express from "express";
import Expense from "../models/Expense.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    if (expenses.length === 0) {
      return res.json({ overspending: false });
    }

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    // ------------------------
    // Last 7 days total
    // ------------------------
    let last7DaysTotal = 0;
    expenses.forEach((e) => {
      if (new Date(e.date) >= sevenDaysAgo) {
        last7DaysTotal += e.amount;
      }
    });

    // ------------------------
    // Historical weekly average
    // ------------------------
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const weeks = Math.max(
      1,
      Math.ceil(
        (now - new Date(expenses[0].date)) / (1000 * 60 * 60 * 24 * 7)
      )
    );

    const weeklyAverage = totalSpent / weeks;

    const overspending = last7DaysTotal > weeklyAverage * 1.25;

    res.json({
      overspending,
      last7DaysTotal: Number(last7DaysTotal.toFixed(2)),
      weeklyAverage: Number(weeklyAverage.toFixed(2)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
