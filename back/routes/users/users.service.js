const userModel = require('../../model/expense.model');

const getAllUsers = async (req, res) => {
  const users = await userModel
    .find()
    .populate('expense', 'firstName lastName userName email ')
    .select('-password');
  res.json(users);
};

const createUser = async (req, res) => {
  const user = await userModel.create(req.body);
  res.json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await userModel.findByIdAndDelete(id).select('-password');
  res.json(deletedUser);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, userName, email } = req.body;
  const updateRequest = {};
  if (firstName) updateRequest.firstName = firstName;
  if (lastName) updateRequest.lastName = lastName;
  if (userName) updateRequest.userName = userName;
  if (email) updateRequest.email = email;

  const updatedUser = await userModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });
  res.json({ updatedUser });
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUserById,
};
