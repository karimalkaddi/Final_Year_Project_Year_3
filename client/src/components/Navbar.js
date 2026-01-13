import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/dashboard">Dashboard</Link>{" | "}
      <Link to="/add-expense">Add Expense</Link>{" | "}
      <Link to="/transactions">Transactions</Link>{" | "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
