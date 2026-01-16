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
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#0f172a"; 

    fetchUser();
    fetchExpenses();
    fetchPrediction();
    fetchAlert();
  }, []);

  const fetchUser = async () => {
    const res = await fetch("http://localhost:5000/api/auth/me", { headers: authHeader });
    const data = await res.json();
    setUser(data);
  };
  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/api/expenses", { headers: authHeader });
    const data = await res.json();
    setExpenses(Array.isArray(data) ? data : []);
  };
  const fetchPrediction = async () => {
    const res = await fetch("http://localhost:5000/api/predictions", { headers: authHeader });
    const data = await res.json();
    setPrediction(data);
  };
  const fetchAlert = async () => {
    const res = await fetch("http://localhost:5000/api/alerts", { headers: authHeader });
    const data = await res.json();
    setAlert(data);
  };

  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });
  
  const barData = Object.keys(categoryTotals).map((cat) => ({
    name: cat, 
    category: cat,
    amount: categoryTotals[cat],
  }));

  const forecastData = prediction && [
    ...(prediction.history || []).map((v, i) => ({ day: `Past ${prediction.history.length - i}`, amount: v })),
    ...(prediction.prediction || []).map((v, i) => ({ day: `Day ${i + 1}`, amount: v })),
  ];

  const username = user?.name || user?.email?.split("@")[0] || "User";

  const COLORS = ["#38bdf8", "#818cf8", "#c084fc", "#fb7185", "#34d399"];

  const styles = {
    container: {
      backgroundColor: "#0f172a", 
      minHeight: "100vh",
      color: "#f8fafc",
      padding: "40px",
      boxSizing: "border-box",
      fontFamily: "'Inter', -apple-system, sans-serif",
    },
    headerWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "30px",
    },
    headerText: {
      fontSize: "2.5rem",
      fontWeight: "800",
      margin: 0,
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    wavingEmoji: {
      fontSize: "2.5rem",
      display: "inline-block",
      animation: "wave-animation 2.5s infinite",
      transformOrigin: "70% 70%",
    },
    alertCard: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid #ef4444",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "30px",
      color: "#fca5a5",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
      marginBottom: "25px",
    },
    card: {
      background: "rgba(30, 41, 59, 0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontSize: "0.9rem",
      color: "#64748b",
      marginBottom: "25px",
      textTransform: "uppercase",
      letterSpacing: "2px",
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes wave-animation {
            0% { transform: rotate( 0.0deg) }
            10% { transform: rotate(14.0deg) }
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate( 0.0deg) }
            100% { transform: rotate( 0.0deg) }
          }
        `}
      </style>

      <div style={styles.headerWrapper}>
        <h1 style={styles.headerText}>Welcome, {username}</h1>
        <span style={styles.wavingEmoji}>👋</span>
      </div>

      {alert?.overspending && (
        <div style={styles.alertCard}>
          <span style={{ fontSize: "24px" }}>⚠️</span>
          <div>
            <strong>Budget Alert</strong>
            <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem" }}>You are currently exceeding your target limits.</p>
          </div>
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="category" stroke="#475569" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', borderRadius: '12px' }}
                itemStyle={{ color: '#38bdf8' }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Spending Share</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={barData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60} 
                outerRadius={80}
                paddingAngle={5}
                stroke="none"
              >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #38bdf8', 
                  borderRadius: '12px' 
                }}
                itemStyle={{ color: '#ffffff' }} // Changed to white
                labelStyle={{ color: '#ffffff' }} // Changed to white
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#94a3b8' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {forecastData && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Financial Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #f472b6', borderRadius: '12px' }}
                itemStyle={{ color: '#f472b6' }}
              />
              <Line type="monotone" dataKey="amount" stroke="#f472b6" strokeWidth={3} dot={{ r: 4, fill: '#f472b6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Dashboard;