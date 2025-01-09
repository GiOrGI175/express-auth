const { Router } = require('express');

const expenseRouter = Router();

const {
  getAllExpenses,
  createExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
} = require('./expenses.service');
const checkValidObjectId = require('../../middlewares/checkValidObjectId');

expenseRouter.get('/', getAllExpenses);
expenseRouter.post('/', createExpenses);
expenseRouter.get('/:id', checkValidObjectId, getExpenseById);
expenseRouter.delete('/:id', checkValidObjectId, deleteExpense);
expenseRouter.put('/:id', checkValidObjectId, updateExpense);

module.exports = expenseRouter;
