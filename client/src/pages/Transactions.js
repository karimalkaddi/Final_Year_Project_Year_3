import { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:5000/api/expenses");
    const data = await res.json();
    setTransactions(data);
  };

  return (
    <div>
      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount (£)</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.category || "Auto"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
