import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settlements = () => {
  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    fetchSettlements();
  }, []);

  const fetchSettlements = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/settlements');
      setSettlements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Settlement Summary</h2>
      <ul>
        {settlements.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
};

export default Settlements;