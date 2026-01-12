import { useState } from "react";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      category,
      description,
      date,
    };

    console.log("Expense submitted:", expenseData);

    // clear form
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount (£)</label><br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label><br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Rent">Rent</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <br />

        <div>
          <label>Description</label><br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Date</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
