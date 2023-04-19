const mongoose = require('mongoose');

const TestResultsSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
    },
    selectedAnswers:{
        type:Map,
        of:String
    },
    providedAnswers:{
        type:Map,
        of:String
    }
})

const TestResults = mongoose.model('TestResults', TestResultsSchema);

module.exports = TestResults;