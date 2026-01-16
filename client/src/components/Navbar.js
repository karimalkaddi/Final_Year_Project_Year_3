import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null; // hide navbar if not logged in

  return (
    <nav style={{ padding: "15px", background: "#222" }}>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/add-expense" style={linkStyle}>Add Expense</Link>
      <Link to="/transactions" style={linkStyle}>Transactions</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>

      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
};

const buttonStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

export default Navbar;
