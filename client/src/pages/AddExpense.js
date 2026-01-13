import { useState } from "react";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      title: title.trim(),
      amount: Number(amount),
      category: category || undefined,
    };

    const res = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Failed to add expense:", error);
      return;
    }

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder="Expense name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount (£)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;
