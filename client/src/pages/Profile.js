import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#0f172a";
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("http://localhost:5000/api/profile", {
      headers: authHeader,
    });
    const data = await res.json();
    setName(data.name || "");
  };

  const saveName = async () => {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: authHeader,
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setMessage(data.message);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3s
  };

  const changePassword = async () => {
    const res = await fetch("http://localhost:5000/api/profile/password", {
      method: "PUT",
      headers: authHeader,
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      setCurrentPassword("");
      setNewPassword("");
    }
    setTimeout(() => setMessage(""), 3000);
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
      maxWidth: "500px",
    },
    header: {
      fontSize: "2.5rem",
      fontWeight: "800",
      textAlign: "center",
      marginBottom: "30px",
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    avatarSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
    },
    avatarCircle: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      marginBottom: "10px",
      boxShadow: "0 10px 20px rgba(56, 189, 248, 0.3)",
    },
    card: {
      background: "rgba(30, 41, 59, 0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "30px",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "0.9rem",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      color: "#94a3b8",
      fontSize: "0.8rem",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "1rem",
      boxSizing: "border-box",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      backgroundColor: "rgba(56, 189, 248, 0.1)",
      border: "1px solid #38bdf8",
      borderRadius: "12px",
      color: "#38bdf8",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    message: {
      textAlign: "center",
      color: "#10b981",
      background: "rgba(16, 185, 129, 0.1)",
      padding: "10px",
      borderRadius: "10px",
      marginTop: "10px",
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          input:focus { border-color: #38bdf8 !important; }
          button:hover { background: #38bdf8 !important; color: #fff !important; }
        `}
      </style>

      <div style={styles.wrapper}>
        <h1 style={styles.header}>Settings</h1>

        <div style={styles.avatarSection}>
          <div style={styles.avatarCircle}>{name ? name[0].toUpperCase() : "U"}</div>
          <span style={{ color: "#94a3b8" }}>{name || "User Account"}</span>
        </div>

        {message && <div style={styles.message}>{message}</div>}

        {/* IDENTITY CARD */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Identity</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Display Name</label>
            <input
              style={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button style={styles.button} onClick={saveName}>Update Name</button>
        </div>

        {/* SECURITY CARD */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Security</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button style={styles.button} onClick={changePassword}>Update Password</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;