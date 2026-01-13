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

  useEffect(() => {
    fetchExpenses();
    fetchPrediction();
  }, []);

  // --------------------
  // Fetch expenses
  // --------------------
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  // --------------------
  // Fetch prediction
  // --------------------
  const fetchPrediction = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/predictions");
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Failed to fetch prediction", err);
    }
  };

  // --------------------
  // Category totals (Bar Chart)
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
  // Forecast data (Line Chart)
  // --------------------
  const forecastData =
    prediction &&
    [
      ...prediction.history.map((value, index) => ({
        day: `Past ${prediction.history.length - index}`,
        amount: value,
      })),
      ...prediction.prediction.map((value, index) => ({
        day: `Day ${index + 1}`,
        amount: value,
      })),
    ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* ================= Bar Chart ================= */}
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

      {/* ================= Forecast ================= */}
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
