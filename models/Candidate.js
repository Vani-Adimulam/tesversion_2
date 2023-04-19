const mongoose = require('mongoose');

const Candidate = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
     lowercase: true,
  },
  testStatus: {
    type: String,
    // enum: ['not started', 'in progress', 'completed', 'cancelled'],
    default: 'not started'
  }
});


module.exports =mongoose.model('Candidate',Candidate);
