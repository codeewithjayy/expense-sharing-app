import React, { useState } from 'react';
import axios from 'axios';

const AddPerson = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/people', { name });
      setName(''); // clear input
      alert('Person added successfully!');
      
      // Trigger refresh in PeopleList
      window.dispatchEvent(new Event('personAdded'));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error adding person');
    }
  };

  return (
    <div>
      <h3>Add Person</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '10px 20px', 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPerson;