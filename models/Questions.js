const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  area: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  question: {
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

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
