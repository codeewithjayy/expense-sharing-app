import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitAmong, setSplitAmong] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/people');
      setPeople(res.data);
    } catch (err) {
      console.error('Failed to load people:', err);
      setError('Failed to load people list. Check backend.');
    }
  };

  const handleSplitChange = (id) => {
    setSplitAmong((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic frontend validation
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    if (!paidBy) {
      alert('Please select who paid');
      return;
    }
    if (people.length === 0) {
      alert('No people available. Add some people first.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/expenses', {
        description: description.trim(),
        amount: parseFloat(amount),
        paidBy,
        splitAmong: splitAmong.length > 0 ? splitAmong : [] // empty = default to all in backend
      });

      // Clear form
      setDescription('');
      setAmount('');
      setPaidBy('');
      setSplitAmong([]);

      alert('Expense added successfully!');

      // Trigger refresh for ExpenseList, Balances & Settlements
      window.dispatchEvent(new Event('expenseAdded'));
      window.dispatchEvent(new Event('balancesUpdated')); // for Balances & Settlements

    } catch (err) {
      console.error('Add expense error:', err.response || err);
      const msg = err.response?.data?.msg || err.message || 'Failed to add expense';
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Add Expense</h2>

      {error && (
        <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            disabled={loading}
            style={{ width: '250px', padding: '10px', marginRight: '10px' }}
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            min="0"
            step="0.01"
            required
            disabled={loading}
            style={{ width: '120px', padding: '10px', marginRight: '10px' }}
          />

          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            required
            disabled={loading}
            style={{ padding: '10px', minWidth: '140px' }}
          >
            <option value="">Paid By</option>
            {people.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>
            Split Among (select multiple, leave empty for all):
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {people.map((p) => (
              <label key={p._id} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={splitAmong.includes(p._id)}
                  onChange={() => handleSplitChange(p._id)}
                  disabled={loading}
                />
                {p.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 24px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;