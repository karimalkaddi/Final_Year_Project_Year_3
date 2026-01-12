import { useEffect, useState } from 'react';
import { getExpenses } from '../api/expenseApi';

function Transactions() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then((res) => {
      setExpenses(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            £{expense.amount} - {expense.category} ({expense.description})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
