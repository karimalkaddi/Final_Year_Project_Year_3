import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // Convert expenses into category totals for chart
  const getCategoryTotals = () => {
    const totals = {};

    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = Number(expense.amount);

      if (!totals[category]) {
        totals[category] = 0;
      }

      totals[category] += amount;
    });

    return Object.keys(totals).map((key) => ({
      category: key,
      total: totals[key],
    }));
  };

  const categoryData = getCategoryTotals();

  // Calculate total spending
  const totalSpending = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>
        <strong>Total Expenses:</strong> £{totalSpending.toFixed(2)}
      </p>

      <h2>Spending by Category</h2>

      {categoryData.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Dashboard;
