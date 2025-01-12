const userModel = require('../model/user.model');

const checkExistUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'email is required' });
  }

  const existUser = await userModel.findOne({ email: email });
  if (existUser) {
    return res.status(400).json({ message: 'user already exists' });
  }
  next();
};

module.exports = checkExistUser;
