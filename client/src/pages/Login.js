import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#0f172a";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Server error");
    }
  };

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
      position: "relative",
      overflow: "hidden",
    },
    // Futuristic glowing background effect
    glow: {
      position: "absolute",
      width: "300px",
      height: "300px",
      backgroundColor: "rgba(56, 189, 248, 0.15)",
      filter: "blur(100px)",
      borderRadius: "50%",
      top: "10%",
      left: "10%",
      zIndex: 0,
    },
    card: {
      background: "rgba(30, 41, 59, 0.6)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "28px",
      padding: "50px 40px",
      width: "100%",
      maxWidth: "420px",
      zIndex: 1,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
    logo: {
      fontSize: "2rem",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-1px",
    },
    subTitle: {
      color: "#94a3b8",
      fontSize: "0.95rem",
      marginBottom: "35px",
    },
    inputGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "14px 18px",
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "14px",
      color: "#fff",
      fontSize: "1rem",
      outline: "none",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
    },
    button: {
      width: "100%",
      padding: "15px",
      marginTop: "10px",
      backgroundColor: "#38bdf8",
      backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
      border: "none",
      borderRadius: "14px",
      color: "white",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(56, 189, 248, 0.3)",
      transition: "transform 0.2s ease",
    },
    error: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid #ef4444",
      color: "#fca5a5",
      padding: "12px",
      borderRadius: "10px",
      marginBottom: "20px",
      fontSize: "0.85rem",
    },
    linkText: {
      marginTop: "25px",
      color: "#64748b",
      fontSize: "0.9rem",
    },
    link: {
      color: "#38bdf8",
      textDecoration: "none",
      fontWeight: "600",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow}></div>
      
      <style>
        {`
          input:focus {
            border-color: #38bdf8 !important;
            box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(56, 189, 248, 0.4);
          }
          button:active {
            transform: translateY(0);
          }
        `}
      </style>

      <div style={styles.card}>
        <div style={styles.logo}>SmartBudget</div>
        <p style={styles.subTitle}>Securely access your finances.</p>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Join SmartBudget
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;