import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // ✅ CLEAR OLD USER DATA FIRST
    setExpenses([]);
    setPrediction(null);

    fetchExpenses();
    fetchPrediction();
  }, [token]); // 👈 reruns when user changes

  // --------------------
  // Fetch expenses
  // --------------------
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  // --------------------
  // Fetch prediction
  // --------------------
  const fetchPrediction = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Failed to fetch prediction", err);
    }
  };

  // --------------------
  // Category totals
  // --------------------
  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const barData = Object.keys(categoryTotals).map((cat) => ({
    category: cat,
    amount: categoryTotals[cat],
  }));

  // --------------------
  // Forecast chart data
  // --------------------
  const forecastData =
    prediction &&
    [
      ...prediction.history.map((v, i) => ({
        day: `Past ${prediction.history.length - i}`,
        amount: v,
      })),
      ...prediction.prediction.map((v, i) => ({
        day: `Day ${i + 1}`,
        amount: v,
      })),
    ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* BAR CHART */}
      <h2>Spending by Category</h2>
      {barData.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* LINE CHART */}
      {prediction && (
        <>
          <h2 style={{ marginTop: "40px" }}>
            Spending Forecast (Next 7 Days)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default Dashboard;
