const mongoose = require('mongoose');

const Evaluator = new mongoose.Schema({
  name:{
    type: String
  },
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
