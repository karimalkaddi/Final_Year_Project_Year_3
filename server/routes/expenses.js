import express from "express";
import Expense from "../models/Expense.js";
import { trainClassifier, categoriseExpense } from "../ml/categoriser.js";

const router = express.Router();

/**
 * GET all expenses
 */
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * ADD new expense
 */
router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // Fetch historical data for training
    const expenses = await Expense.find();
    trainClassifier(expenses);

    // Decide category
    const finalCategory =
      category && category !== ""
        ? category
        : categoriseExpense(title);

    const expense = new Expense({
      title,
      amount,
      category: finalCategory,
      date: new Date()
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
