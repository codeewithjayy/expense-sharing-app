const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
  splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true }]
});

module.exports = mongoose.model('Expense', ExpenseSchema);