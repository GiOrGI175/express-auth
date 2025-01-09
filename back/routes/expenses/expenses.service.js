const expenseModel = require('../../model/expense.model');

const getAllExpenses = async (req, res) => {
  const expense = await expenseModel.find();
  res.json(expense);
};

const createExpenses = async (req, res) => {
  const Expense = await expenseModel.create(req.body);
  res.json(Expense);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const Expense = await expenseModel.findById(id);
  res.json(Expense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const deletedExpense = await expenseModel.findByIdAndDelete(id);
  res.json(deletedExpense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ updatedExpense });
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
