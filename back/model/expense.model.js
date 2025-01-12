const { default: mongoose } = require('mongoose');

const expenseShema = new mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('expense', expenseShema);
