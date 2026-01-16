import { useState, useEffect } from "react";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#0f172a";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in");
      return;
    }

    // --- LOGIC RESTORED TO ORIGINAL ---
    const expense = {
      title: title.trim(),
      amount: Number(amount),
      category: category || undefined, // Restored: Backend handles the auto-categorization
    };

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  // --- UI STYLES ---
  const styles = {
    container: {
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    },
    card: {
      background: "rgba(30, 41, 59, 0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "40px",
      width: "100%",
      maxWidth: "450px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "800",
      marginBottom: "10px",
      textAlign: "center",
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: "0 0 10px 0",
    },
    subText: {
      color: "#94a3b8",
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "0.9rem",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      color: "#94a3b8",
      marginBottom: "8px",
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "14px",
      marginTop: "10px",
      backgroundColor: "#38bdf8",
      backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(56, 189, 248, 0.4)",
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          input:focus {
            border-color: #38bdf8 !important;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
            background-color: rgba(15, 23, 42, 0.8) !important;
          }
          button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
        `}
      </style>

      <div style={styles.card}>
        <h2 style={styles.header}>Add Expense</h2>
        <p style={styles.subText}>The system will automatically categorize known merchants.</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Expense Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. Uber"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount (£)</label>
            <input
              style={styles.input}
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category (Optional)</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Leave blank for auto-detect"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;