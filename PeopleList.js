import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/people');
      setPeople(res.data);
    } catch (err) {
      console.error('Error fetching people:', err);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []); // initial load

  // Listen for refresh signal from AddPerson component
  useEffect(() => {
    const handleRefresh = () => fetchPeople();
    window.addEventListener('personAdded', handleRefresh);
    return () => window.removeEventListener('personAdded', handleRefresh);
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>People List</h3>
      {people.length === 0 ? (
        <p style={{ color: '#777' }}>No people added yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {people.map(person => (
            <li 
              key={person._id} 
              style={{ 
                padding: '8px 12px', 
                background: '#f0f8ff', 
                margin: '6px 0', 
                borderRadius: '6px',
                border: '1px solid #b3d4fc'
              }}
            >
              {person.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PeopleList;