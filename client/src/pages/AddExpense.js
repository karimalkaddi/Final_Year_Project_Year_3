import { useState } from "react";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in");
      return;
    }

    const expense = {
      title: title.trim(),
      amount: Number(amount),
      category: category || undefined,
    };

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ THIS WAS MISSING
        },
        body: JSON.stringify(expense),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to add expense:", data);
        alert(data.message || "Failed to add expense");
        return;
      }

      setTitle("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error("Request failed:", err);
    }
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
