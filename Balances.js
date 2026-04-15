import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Balances = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/balances');
      setBalances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Balances</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Paid</th>
            <th>Total Share</th>
            <th>Net Balance</th>
          </tr>
        </thead>
        <tbody>
          {balances.map(b => (
            <tr key={b.name}>
              <td>{b.name}</td>
              <td>₹{b.paid.toFixed(2)}</td>
              <td>₹{b.share.toFixed(2)}</td>
              <td>₹{b.net.toFixed(2)} {b.net > 0 ? '(Others owe)' : b.net < 0 ? '(Owes others)' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Balances;