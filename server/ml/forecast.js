/**
 * Simple time-series spending forecast
 * Uses moving average over recent expenses
 */

export function predictSpending(expenses, days = 7) {
  if (!expenses || expenses.length === 0) return 0;

  // Sort by date (old → new)
  const sorted = expenses
    .filter(e => typeof e.amount === "number")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Use last N entries (sliding window)
  const windowSize = Math.min(sorted.length, 7);
  const recent = sorted.slice(-windowSize);

  const total = recent.reduce((sum, e) => sum + e.amount, 0);
  const averagePerExpense = total / windowSize;

  // Simple projection
  return Number((averagePerExpense * days).toFixed(2));
}
