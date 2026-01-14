import express from "express";
import Expense from "../models/Expense.js";
import { trainClassifier, categoriseExpense } from "../ml/categoriser.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * GET all expenses for logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * ADD new expense (linked to user)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount required" });
    }

    // 🔹 Train classifier ONLY on this user's data
    const userExpenses = await Expense.find({ user: req.user.id });
    trainClassifier(userExpenses);

    const finalCategory =
      category && category.trim() !== ""
        ? category
        : categoriseExpense(title);

    const expense = new Expense({
      title,
      amount,
      category: finalCategory,
      user: req.user.id, // ✅ CRITICAL FIX
      date: new Date(),
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
