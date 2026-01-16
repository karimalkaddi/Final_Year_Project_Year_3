import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#0f172a";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/login");
    } else {
      alert(data.message);
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
    // Mirroring the glow from the Login page
    glow: {
      position: "absolute",
      width: "400px",
      height: "400px",
      backgroundColor: "rgba(129, 140, 248, 0.15)", // Slightly more purple/indigo
      filter: "blur(100px)",
      borderRadius: "50%",
      bottom: "5%",
      right: "5%",
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
      background: "linear-gradient(to right, #818cf8, #c084fc)", // Purple gradient for variety
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
    label: {
      display: "block",
      color: "#64748b",
      fontSize: "0.75rem",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "1px",
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
      backgroundColor: "#818cf8",
      backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
      border: "none",
      borderRadius: "14px",
      color: "white",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(129, 140, 248, 0.3)",
      transition: "transform 0.2s ease",
    },
    linkText: {
      marginTop: "25px",
      color: "#64748b",
      fontSize: "0.9rem",
    },
    link: {
      color: "#818cf8",
      textDecoration: "none",
      fontWeight: "600",
    },
    securityTip: {
      fontSize: "0.75rem",
      color: "#475569",
      marginTop: "8px",
      fontStyle: "italic",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow}></div>
      
      <style>
        {`
          input:focus {
            border-color: #818cf8 !important;
            box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(129, 140, 248, 0.4);
          }
        `}
      </style>

      <div style={styles.card}>
        <div style={styles.logo}>SmartBudget</div>
        <p style={styles.subTitle}>Start your journey to financial freedom.</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="e.g. student@uni.ac.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Create Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p style={styles.securityTip}>Use 8+ characters for a secure vault.</p>
          </div>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;