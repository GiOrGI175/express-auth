const { Router } = require('express');

const userRouter = Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUserById,
} = require('./users.service');

const checkExistUser = require('../../middlewares/checkExistUser');
const checkValidObjectId = require('../../middlewares/checkValidObjectId');

userRouter.get('/', getAllUsers);
userRouter.post('/', checkExistUser, createUser);
userRouter.get('/:id', checkValidObjectId, getUserById);
userRouter.delete('/:id', checkValidObjectId, deleteUser);
userRouter.put('/:id', checkValidObjectId, updateUserById);

module.exports = userRouter;
