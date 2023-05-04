const mongoose = require('mongoose');

const Evaluator = new mongoose.Schema({
  role:{
    type: String,
    default:"evaluator"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Evaluator', Evaluator);
