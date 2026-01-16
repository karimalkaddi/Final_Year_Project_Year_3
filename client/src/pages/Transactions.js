import { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // NEW: Search state
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#0f172a";
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  // --- LOGIC: Filter transactions based on search input ---
  const filteredTransactions = transactions.filter((t) => {
    const titleMatch = t.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = t.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || categoryMatch;
  });

  const getCategoryIcon = (category) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("food") || cat.includes("grocer")) return "🍔";
    if (cat.includes("transport") || cat.includes("uber") || cat.includes("train")) return "🚗";
    if (cat.includes("rent") || cat.includes("bill")) return "🏠";
    if (cat.includes("fun") || cat.includes("entert") || cat.includes("sub")) return "🎬";
    if (cat.includes("uni") || cat.includes("book") || cat.includes("educ")) return "📚";
    return "💰";
  };

  const styles = {
    container: {
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      color: "#f8fafc",
      padding: "40px 20px",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    wrapper: {
      width: "100%",
      maxWidth: "600px",
    },
    header: {
      fontSize: "2.5rem",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: "0 0 10px 0"
    },
    searchContainer: {
      width: "100%",
      position: "relative",
      marginBottom: "30px",
    },
    searchInput: {
      width: "100%",
      padding: "14px 20px 14px 45px", // Extra padding on left for icon
      backgroundColor: "rgba(30, 41, 59, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "#f1f5f9",
      fontSize: "1rem",
      outline: "none",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.2rem",
      opacity: "0.5"
    },
    feed: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    card: {
      background: "rgba(30, 41, 59, 0.4)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "18px",
      padding: "16px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    leftSide: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    iconBox: {
      width: "48px",
      height: "48px",
      borderRadius: "14px",
      backgroundColor: "rgba(56, 189, 248, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.3rem",
    },
    info: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontWeight: "600",
      fontSize: "1.05rem",
      color: "#f1f5f9",
      margin: 0,
    },
    category: {
      fontSize: "0.8rem",
      color: "#64748b",
    },
    amount: {
      fontWeight: "700",
      fontSize: "1.1rem",
      color: "#fff",
    },
    empty: {
      textAlign: "center",
      padding: "50px",
      color: "#475569",
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          input:focus {
            border-color: #38bdf8 !important;
            background: rgba(30, 41, 59, 0.8) !important;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.1);
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <h1 style={styles.header}>Transactions</h1>
        
        {/* WORKING SEARCH BAR */}
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            style={styles.searchInput}
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredTransactions.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: "3rem", marginBottom: "10px" }}>🕵️‍♂️</p>
            <p>{searchTerm ? "No matching transactions found." : "No activity recorded yet."}</p>
          </div>
        ) : (
          <div style={styles.feed}>
            {filteredTransactions.map((t) => (
              <div key={t._id} style={styles.card}>
                <div style={styles.leftSide}>
                  <div style={styles.iconBox}>
                    {getCategoryIcon(t.category)}
                  </div>
                  <div style={styles.info}>
                    <p style={styles.title}>{t.title}</p>
                    <span style={styles.category}>{t.category || "General"}</span>
                  </div>
                </div>
                <div style={styles.amount}>
                  - £{Number(t.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;