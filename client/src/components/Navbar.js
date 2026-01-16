import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Used to highlight the active page
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!token) return null;

  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      fontFamily: "'Inter', sans-serif",
    },
    logo: {
      fontSize: "1.4rem",
      fontWeight: "800",
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textDecoration: "none",
      letterSpacing: "-1px",
    },
    linksContainer: {
      display: "flex",
      gap: "25px",
      alignItems: "center",
    },
    link: (path) => ({
      color: location.pathname === path ? "#38bdf8" : "#94a3b8",
      textDecoration: "none",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      position: "relative",
    }),
    logoutBtn: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      padding: "8px 16px",
      borderRadius: "10px",
      fontSize: "0.85rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }
  };

  return (
    <nav style={styles.nav}>
      <style>
        {`
          .nav-link:hover {
            color: #38bdf8 !important;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 0;
            background-color: #38bdf8;
            transition: width 0.3s ease;
          }
          .nav-link:hover::after {
            width: 100%;
          }
          .logout-btn:hover {
            background: #ef4444 !important;
            color: white !important;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
          }
        `}
      </style>

      <Link to="/dashboard" style={styles.logo}>
        SmartBudget
      </Link>

      <div style={styles.linksContainer}>
        <Link to="/dashboard" className="nav-link" style={styles.link("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/add-expense" className="nav-link" style={styles.link("/add-expense")}>
          Add
        </Link>
        <Link to="/transactions" className="nav-link" style={styles.link("/transactions")}>
          History
        </Link>
        <Link to="/profile" className="nav-link" style={styles.link("/profile")}>
          Profile
        </Link>

        <button 
          onClick={handleLogout} 
          className="logout-btn" 
          style={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;