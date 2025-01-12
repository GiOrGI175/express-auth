const express = require('express');
const conectToDb = require('./db/conectToMongodb');
const userRouter = require('./routes/users/users.router');
const expenseRouter = require('./routes/expenses/expenses.router');
const isAuth = require('./middlewares/isAuth.middleware');
const authRouter = require('./routes/auth/auth.router');
const app = express();
app.use(express.json());

conectToDb();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/expenses', isAuth, expenseRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(3001, () => {
  console.log('running on: http://localhost:3001');
});
