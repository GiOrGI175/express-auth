const { Router } = require('express');
const userModel = require('../../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = Router();

authRouter.post('/sign-up', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  if (!firstName || !lastName || !userName || !email)
    return res.status(400).json({ message: 'wrong params' });

  const existUser = await userModel.findOne({ email });
  if (existUser)
    return res.status(400).json({ message: 'user already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: 'user created successfully' });
});

authRouter.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'email or password is required' });

  const existUser = await userModel.find({ email });
  if (!existUser)
    return res.status(400).json({ message: 'email or password is incorect' });

  const isPasswordEqual = await bcrypt.compare(password, existUser.password);
  if (!isPasswordEqual)
    return res.status(400).json({ message: 'email or password incorect' });

  const payLoad = {
    userId: existUser._id,
  };

  const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '1h' });
});

module.exports = authRouter;
