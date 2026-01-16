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
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchUser();
    fetchExpenses();
    fetchPrediction();
    fetchAlert();
  }, []);

  // --------------------
  // Fetch logged-in user
  // --------------------
  const fetchUser = async () => {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: authHeader,
    });
    const data = await res.json();
    setUser(data);
  };

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/api/expenses", {
      headers: authHeader,
    });
    const data = await res.json();
    setExpenses(Array.isArray(data) ? data : []);
  };

  const fetchPrediction = async () => {
    const res = await fetch("http://localhost:5000/api/predictions", {
      headers: authHeader,
    });
    const data = await res.json();
    setPrediction(data);
  };

  const fetchAlert = async () => {
    const res = await fetch("http://localhost:5000/api/alerts", {
      headers: authHeader,
    });
    const data = await res.json();
    setAlert(data);
  };

  // --------------------
  // Charts
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

  const forecastData =
    prediction &&
    [
      ...(prediction.history || []).map((v, i) => ({
        day: `Past ${prediction.history.length - i}`,
        amount: v,
      })),
      ...(prediction.prediction || []).map((v, i) => ({
        day: `Day ${i + 1}`,
        amount: v,
      })),
    ];

  const username =
  user?.name && user.name.trim() !== ""
    ? user.name
    : user?.email
    ? user.email.split("@")[0]
    : "User";


  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {username} 👋</h1>

      {alert?.overspending && (
        <div style={{ background: "#ffe5e5", padding: "15px", borderRadius: "8px" }}>
          ⚠️ <strong>Overspending Alert</strong>
        </div>
      )}

      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>

      {forecastData && (
        <>
          <h2 style={{ marginTop: "40px" }}>Spending Forecast</h2>
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
