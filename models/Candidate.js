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
    default: 'Test Not Taken'
  },
  result : {
    type : String, 
  },
  name : {
    type : String,
    required: true,
  },
  area : {
    type : String,
    required : true,
  },
  mcqCount:{
    type : Number,
    // required : true,
  },
  codeCount : {
    type: Number,
    // required : true,
  },
  paragraphCount : {
    type: Number,
    // required : true,
  }
});


module.exports =mongoose.model('Candidate',Candidate);