import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

export const addExpense = (expenseData) => {
  return axios.post(API_URL, expenseData);
};

export const getExpenses = () => {
  return axios.get(API_URL);
};
