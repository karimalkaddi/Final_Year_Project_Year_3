import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
      <Link to="/add-expense" style={{ marginRight: "10px" }}>Add Expense</Link>
      <Link to="/transactions">Transactions</Link>
    </nav>
  );
}

export default Navbar;
