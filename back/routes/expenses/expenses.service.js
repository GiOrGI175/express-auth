const expenseModel = require('../../model/expense.model');
const userModel = require('../../model/user.model');

const getAllExpenses = async (req, res) => {
  const expense = await expenseModel
    .find()
    .populate('user', 'category name price');
  res.json(expense);
};

const createExpenses = async (req, res) => {
  const { category, name, price } = req.body;

  if (!category | !name | !price)
    return res.status(400).json({ message: 'all filde is requeied' });

  const newExpense = await expenseModel.create({
    category,
    name,
    price,
    user: req.userId,
  });

  await userModel.findByIdAndUpdate(req.userId, {
    $push: { user: newExpense._id },
  });

  return res.status(200).json(newExpense);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const Expense = await expenseModel.findById(id);
  res.json(Expense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(req.userId);
  const hasPermition = user.expenses.find((el) => el.toString() === id);
  if (!hasPermition)
    return res.status(401).json({ message: 'permition dinied' });

  const deletedExpense = await expenseModel.findByIdAndDelete(id);
  if (!deletedExpense)
    return res.status(400).json({ message: 'can not deleteed expense' });

  await userModel.findByIdAndUpdate(req.userId, {
    $pull: { expenses: deletedExpense._id },
  });
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
