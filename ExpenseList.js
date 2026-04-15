import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setError('Could not load expenses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Listen for new expense added event (triggered from AddExpense component)
  useEffect(() => {
    const handleExpenseAdded = () => {
      fetchExpenses();
    };

    window.addEventListener('expenseAdded', handleExpenseAdded);

    // Cleanup
    return () => {
      window.removeEventListener('expenseAdded', handleExpenseAdded);
    };
  }, []); // empty deps → only add/remove listener once

  if (loading) {
    return (
      <div className="expense-list-container">
        <h2>Expense List</h2>
        <p>Loading expenses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="expense-list-container">
        <h2>Expense List</h2>
        <p className="error-message">{error}</p>
        <button onClick={fetchExpenses}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Paid By</th>
              <th>Split Among</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.description}</td>
                <td className="amount">₹{Number(exp.amount).toLocaleString('en-IN')}</td>
                <td>{exp.paidBy?.name || 'Unknown'}</td>
                <td>
                  {exp.splitAmong && exp.splitAmong.length > 0
                    ? exp.splitAmong.map((p) => p.name || p).join(', ')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;