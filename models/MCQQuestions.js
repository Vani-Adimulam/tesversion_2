const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MCQQuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  choice1: {
    type: String,
    required: true
  },
  choice2: {
    type: String,
    required: true
  },
  choice3: {
    type: String,
    required: true
  },
  choice4: {
    type: String,
    required: true
  },
  correct_choice: {
    type: String,
    required: true
  }
});

const MCQQuestion = mongoose.model('MCQQuestion', MCQQuestionSchema);

module.exports = MCQQuestion;
