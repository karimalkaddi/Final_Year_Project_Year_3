import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

/*
  GET /api/predictions
  Returns:
  {
    history: number[],
    prediction: number[]
  }
*/
router.get("/", async (req, res) => {
  try {
    // Fetch only THIS user's expenses
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: 1 });

    if (expenses.length === 0) {
      return res.json({
        history: [],
        prediction: [],
      });
    }

    // Group by day
    const dailyTotals = {};

    expenses.forEach((e) => {
      const day = new Date(e.date).toISOString().split("T")[0];
      dailyTotals[day] = (dailyTotals[day] || 0) + e.amount;
    });

    const history = Object.values(dailyTotals);

    // Simple moving average forecast
    const avg =
      history.reduce((a, b) => a + b, 0) / history.length;

    const prediction = Array(7).fill(
      Math.round(avg * 100) / 100
    );

    res.json({
      history,
      prediction,
    });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ message: "Prediction failed" });
  }
});

export default router;
