import { useEffect, useState } from 'react';
import { getExpenses } from '../api/expenseApi';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getExpenses().then((res) => {
      const data = res.data;
      setExpenses(data);

      // Total spending
      const sum = data.reduce(
        (acc, expense) => acc + Number(expense.amount),
        0
      );
      setTotal(sum);
    });
  }, []);

  // Category totals (THIS GOES HERE)
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  return (
    <div>
      <h2>Dashboard</h2>

      <p><strong>Total Spending:</strong> £{total}</p>
      <p><strong>Number of Transactions:</strong> {expenses.length}</p>

      <h3>Spending by Category</h3>
      <ul>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <li key={category}>
            {category}: £{amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
