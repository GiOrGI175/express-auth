const { default: mongoose } = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.mongo_URI);
    console.log('conected to successfully');
  } catch (error) {
    console.log(error);
  }
};
