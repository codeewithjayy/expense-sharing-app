# Mini Expense Sharing App

A simple MERN stack app for tracking shared expenses and calculating who owes whom.

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas cloud database)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd expense-sharing-app
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=mongodb://localhost:27017/expense-sharing-app  # or your MongoDB Atlas URI
PORT=5000
```

Start the backend server:
```bash
npm start
```
The backend will run on http://localhost:5000.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```
The frontend will run on http://localhost:3000.

### 4. Access the Application
Open your browser and go to http://localhost:3000 to use the expense sharing app.

## How to Use the App
1. Add people to the group using the "Add Person" section.
2. Add expenses by selecting the payer and participants, entering the amount and description.
3. View the list of expenses and current balances.
4. Check the settlements to see who owes whom and how to settle debts.

## Key Decisions
- Used MERN stack for React's ease in building interactive UIs.
- Calculations performed in backend for security and accuracy.
- Basic greedy settlement algorithm (no advanced graph optimization).

## Trade-offs/Assumptions
- No authentication, deletion, or editing features for simplicity.
- Equal splits only; amounts in INR (₹).
- Assumes small group; no performance optimizations.
- Floating-point balances rounded to 2 decimals.