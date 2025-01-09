const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String | Number,
  },
  expenses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'expense',
    default: [],
  },
});

module.exports = mongoose.model('user', userSchema);
