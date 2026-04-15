// frontend/src/App.js
import React from 'react';
import './App.css';
import AddPerson from './components/AddPerson';
import PeopleList from './components/PeopleList';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Balances from './components/Balances';
import Settlements from './components/Settlements';

function App() {
  return (
    <div 
      className="App"
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <h1 
          style={{
            color: '#2c3e50',
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '2.8rem',
            fontWeight: 600,
          }}
        >
          Mini Expense Sharing App
        </h1>

        {/* People Management Section */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            color: '#34495e',
            marginBottom: '20px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
          }}>
            1. Manage Group Members
          </h2>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <AddPerson />
            <PeopleList />
          </div>
        </section>

        {/* Expenses Section */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            color: '#34495e',
            marginBottom: '20px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
          }}>
            2. Add & View Expenses
          </h2>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <AddExpense />
            <ExpenseList />
          </div>
        </section>

        {/* Balances & Settlements Section */}
        <section>
          <h2 style={{
            color: '#34495e',
            marginBottom: '20px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
          }}>
            3. Balances & Who Owes Whom
          </h2>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <Balances />
            <Settlements />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;