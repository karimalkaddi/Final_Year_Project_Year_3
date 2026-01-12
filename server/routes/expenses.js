const express = require('express');
const router = express.Router();
const Expense = require("../models/Expense");
const categoriseExpense = require("../utils/categoriseExpense");

router.post("/", async (req, res) => {
  try {
    const { title, amount } = req.body;

    const category = categoriseExpense(title);

    const expense = new Expense({
      title,
      amount,
      category
    });

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});


/**
 * GET: Get all expenses
 */
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
