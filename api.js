const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const Expense = require('../models/Expense');

// People: Add
router.post('/people', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: 'Name required' });
  try {
    const existing = await Person.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Duplicate name' });
    const person = new Person({ name });
    await person.save();
    res.json(person);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// People: List
router.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Expenses: Add
router.post('/expenses', async (req, res) => {
  let { description, amount, paidBy, splitAmong } = req.body;
  if (!description || !amount || !paidBy || amount <= 0) {
    return res.status(400).json({ msg: 'Invalid input' });
  }
  try {
    const paidByPerson = await Person.findById(paidBy);
    if (!paidByPerson) return res.status(400).json({ msg: 'Invalid paidBy' });

    if (!splitAmong || splitAmong.length === 0) {
      const allPeople = await Person.find();
      splitAmong = allPeople.map(p => p._id);
    } else {
      for (let id of splitAmong) {
        if (!await Person.findById(id)) return res.status(400).json({ msg: 'Invalid splitAmong' });
      }
    }

    const expense = new Expense({ description, amount, paidBy, splitAmong });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Expenses: List
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('paidBy splitAmong', 'name');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Balances
router.get('/balances', async (req, res) => {
  try {
    const people = await Person.find();
    const expenses = await Expense.find().populate('splitAmong');

    const balances = {};
    people.forEach(p => {
      balances[p._id] = { name: p.name, paid: 0, share: 0, net: 0 };
    });

    expenses.forEach(exp => {
      balances[exp.paidBy._id].paid += exp.amount;
      const sharePerPerson = exp.amount / exp.splitAmong.length;
      exp.splitAmong.forEach(person => {
        balances[person._id].share += sharePerPerson;
      });
    });

    Object.keys(balances).forEach(id => {
      balances[id].net = balances[id].paid - balances[id].share;
    });

    res.json(Object.values(balances));
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Settlements
router.get('/settlements', async (req, res) => {
  try {
    // Reuse balance logic
    const people = await Person.find();
    const expenses = await Expense.find().populate('splitAmong');

    const balances = {};
    people.forEach(p => {
      balances[p._id] = { name: p.name, paid: 0, share: 0, net: 0 };
    });

    expenses.forEach(exp => {
      balances[exp.paidBy._id].paid += exp.amount;
      const sharePerPerson = exp.amount / exp.splitAmong.length;
      exp.splitAmong.forEach(person => {
        balances[person._id].share += sharePerPerson;
      });
    });

    Object.keys(balances).forEach(id => {
      balances[id].net = balances[id].paid - balances[id].share;
    });

    // Greedy settlement
    let balanceList = Object.values(balances).map(b => ({ ...b }));
    let creditors = balanceList.filter(b => b.net > 0).sort((a, b) => b.net - a.net);
    let debtors = balanceList.filter(b => b.net < 0).sort((a, b) => a.net - b.net);

    const settlements = [];
    while (creditors.length > 0 && debtors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];
      const amount = Math.min(-debtor.net, creditor.net);
      settlements.push(`${debtor.name} owes ${creditor.name} ₹${amount.toFixed(2)}`);

      debtor.net += amount;
      creditor.net -= amount;

      if (debtor.net >= 0) debtors.shift();
      if (creditor.net <= 0) creditors.shift();
    }

    res.json(settlements);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;