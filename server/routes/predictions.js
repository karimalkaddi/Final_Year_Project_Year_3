import express from "express";
import Expense from "../models/Expense.js";
import { predictSpending } from "../ml/forecast.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const expenses = await Expense.find().sort({ date: 1 });

  const dailyTotals = {};
  expenses.forEach((e) => {
    const day = e.date.toISOString().slice(0, 10);
    dailyTotals[day] = (dailyTotals[day] || 0) + e.amount;
  });

  const values = Object.values(dailyTotals);
  const avgDailySpend =
    values.reduce((a, b) => a + b, 0) / values.length || 0;

  const history = values.slice(-7);
  const prediction = Array(7).fill(avgDailySpend);

  res.json({
    history,
    prediction,
  });
});


export default router;
