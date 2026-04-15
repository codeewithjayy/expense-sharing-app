# Expense Sharing App

A simple expense sharing application built with a React frontend and a Node.js/Express backend. This app helps a small group track shared expenses, calculate balances, and determine settlements between members.

## Project Overview

- **Frontend:** React app in `frontend/`
- **Backend:** Express API in `backend/`
- **Database:** MongoDB (local or Atlas)
- **Goal:** Add people, record expenses, display balances, and compute settlements.

## Project Structure

```
expense-sharing-app/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── models/
│   │   ├── Expense.js
│   │   └── Person.js
│   └── routes/
│       └── api.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── AddExpense.js
│           ├── AddPerson.js
│           ├── Balances.js
│           ├── ExpenseList.js
│           ├── PeopleList.js
│           └── Settlements.js
└── README.md
```

## Prerequisites

- Node.js 14+ installed
- npm (or yarn) installed
- MongoDB running locally or a MongoDB Atlas URI available

## Step-by-Step Setup and Execution

### 1. Clone the repository

```bash
git clone <repo-url>
cd expense-sharing-app
```

> Replace `<repo-url>` with your repository URL.

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with the following content:

```env
MONGO_URI=mongodb://localhost:27017/expense-sharing-app
PORT=5000
```

> If you use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

Start the backend server:

```bash
npm start
```

The backend API will run at `http://localhost:5000`.

### 3. Setup the frontend

Open a new terminal, then:

```bash
cd frontend
npm install
npm start
```

The frontend will start at `http://localhost:3000` and should automatically open in your browser.

### 4. Use the application

1. Open `http://localhost:3000` in your browser.
2. Add people to the group using the `Add Person` form.
3. Add new expenses with payer, participants, amount, and description.
4. Review the expense list, current balances, and settlement suggestions.

## How the App Works

- **People:** Add members who share expenses.
- **Expenses:** Record costs, who paid, and who participated.
- **Balances:** Calculate how much each person owes or is owed.
- **Settlements:** Generate recommended payments to settle debts.

## Notes

- This project is designed for small groups and easy expense tracking.
- It currently assumes equal splits for each expense.
- There is no authentication or account management in this version.

## Useful Commands

From the project root:

```bash
cd backend
npm install
npm start
```

```bash
cd frontend
npm install
npm start
```

## Troubleshooting

- If frontend cannot reach backend, check that `backend` is running on port `5000`.
- If MongoDB connection fails, verify the URI in `backend/.env`.
- If port `3000` or `5000` is already in use, stop the conflicting process or update the port.

## Improvements You Can Add

- Authentication and user login
- Expense editing and deletion
- Unequal split support
- Transaction history and receipts
- Better settlement optimization
