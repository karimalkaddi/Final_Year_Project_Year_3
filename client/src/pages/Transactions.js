import { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ REQUIRED
        },
      });

      const data = await res.json();

      // ✅ SAFETY CHECK (prevents map errors)
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t._id}>
              {t.title} — £{t.amount} ({t.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transactions;
