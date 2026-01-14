import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
    default: "other",
  },

  // ✅ LINK EXPENSE TO LOGGED-IN USER
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Expense", expenseSchema);
