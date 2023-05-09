// server.js
const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const Candidate = require('./models/Candidate');
const Evaluator = require('./models/Evaluator');
const MCQQuestion = require('./models/MCQQuestions');
const ParagraphQuestion = require('./models/ParagraphQuestions');
const TestResults = require('./models/TestResults');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true
  })
  .then(() => console.log('DB Connection established'))
  .catch((err) => console.log(`DB Connection error: ${err.message}`));

app.use(express.json());

app.use(cors({origin:"*"}))

app.use(bodyParser.json());

// API to add evaluator 
app.post('/addEvaluator', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt)
    // Save the hashed password and email to the database
    await Evaluator.create({ email, password: hashedPassword });

    return res.send('Evaluator added successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

//candidate register route
app.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const { name } = req.body;
    const { area } = req.body;
    const { mcqCount } = req.body;
    const { codeCount } = req.body;
    const { passPercentage } = req.body;
    let exist = await Candidate.findOne({ email });
    if (exist) {
      return res.send('Candidate Already Exist');
    }
    let newUser = new Candidate({ email, name, area, mcqCount, codeCount, passPercentage });
    await newUser.save();
    res.status(200).send('Registered Successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/verify-emails', async (req, res) => {
  try {
    const { email } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ status: 'Email not found' });
    }
    
    if (candidate.testStatus !== "Test Not Taken") {
      return res.status(401).json({ status: 'Test already taken' });
    }

    if (candidate.testStatus === "Test Cancelled") {
      return res.status(401).json({ status: 'Test cancelled' });
    }

    // Create and sign JWT
    let payload = {
      user:{
        id: candidate.id,
      }
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET1,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/loginEvaluator', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the evaluator in the database by email
    const evaluator = await Evaluator.findOne({ email });
    // If evaluator with provided email does not exist, return an error message
    if (!evaluator) {
      return res.status(400).send('Invalid email');
    }
    // Compare the hashed password with the password provided by the user
    const isMatch = await bcrypt.compare(password, evaluator.password);
    // If the password is incorrect, return an error message
    if (!isMatch) {
      return res.status(400).send('Invalid Password');
    }
    // Create a JWT token with the evaluator email and id as payload
    const payload = { user: { id: evaluator.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API endpoint for adding a question to the "questions" collection
app.post('/addQuestionMCQ', async (req, res) => {
  const {area,question,choice1, choice2, choice3, choice4, correct_choice } = req.body;
  
  // Create a new question document
  const newQuestion = new MCQQuestion({
    area,
    question,
    choice1,
    choice2,
    choice3,
    choice4,
    correct_choice
  });
  
  // Save the new question document to the "questions" collection
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error('Error saving question to MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//add a post API for Paragraph question with subtype field and other fields as question, answer.
app.post('/addParagraphQuestion', async (req, res) => {
  const { question, area, subtype, answer } = req.body;
  const newQuestion = new ParagraphQuestion({
  question,
  area,
  subtype,
  answer
});
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error('Error saving question to MongoDB:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // a get api to fetch and send all questions and fields?
  app.get('/getMCQQuestions', async (req, res) => {
    try {
      const { ids } = req.query;
      const idArr = ids ? ids.split(",") : null;
      if(idArr){
      const questions = await MCQQuestion.find({ _id: { $in: idArr } });
      res.json(questions);
      }
      else{
        const questions = await MCQQuestion.find({});
        res.json(questions);
      }
      
    } catch (error) {
      console.error('Error getting questions from MongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// API to get Paragraph questions
app.get('/getParagraphQuestions', async(req, res) => {
  try {
    const { ids } = req.query
    const idArr = ids ? ids.split(",") : null
    if(idArr){
      const questions = await ParagraphQuestion.find({_id: {$in:idArr}});
      res.json(questions); 
    }
    else{
      const questions = await ParagraphQuestion.find({});
      res.json(questions); 
    }
  } catch (error) {
    console.error('Error getting questions from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// create an API to get random MCQ Questions from Question Bank given area
// and number
app.get('/getMCQQuestionsforTest/:email', async (req, res) => {
  try {
    const email = req.params.email.replace(/['"]+/g, ''); // remove quotes from the string  
    const candidate = await Candidate.find({email:email})
    if (!candidate) {
      res.status(500).json('Candidate not found');
    }
    else {
      const area = candidate[0].area
      const number = candidate[0].mcqCount
      const questions = await MCQQuestion.aggregate([
          { $match: { area: area } },
          { $sample: { size: Number(number) } },
          { $sort: { _id: 1 } },
          { $project: { correct_choice: 0 } } // exclude correct_choice
        ]);
      res.json({ questions });
    }
  } catch (error) {
    console.log(error)
    console.log('Unable to create Test, Please select correct number of questions');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// create an API to get random PARAGRAPH Questions from Question Bank given area
// subtype and number
app.get('/getParagraphQuestionsforTest/:email/', async (req, res) => {
  const email = req.params.email.replace(/['"]+/g, ''); // remove quotes from the string
  const candidate = await Candidate.find({email:email})
  console.log(candidate)

  if (!candidate) {
    res.status(500).json('Candidate not found');
    }
    else {
      try {
        const area = candidate[0].area
        const number1 = candidate[0].codeCount
        const number2 = candidate[0].paragraphCount
        const code_questions = await ParagraphQuestion.aggregate([
          { $match: { area: area, subtype: "code" } },
          { $sample: { size: Number(number1) } },
          { $sort: { _id: 1 } },
          { $project: { answer: 0 } } // exclude answer
        ]);
        const text_questions = await ParagraphQuestion.aggregate([
          { $match: { area: area, subtype: "text" } },
          { $sample: { size: Number(number2) } },
          { $sort: { _id: 1 } },
          { $project: { answer: 0 } } // exclude answer
        ]);
        questions = code_questions.concat(text_questions)
        // console.log(questions)
        res.json({ questions });
      } catch (error) {
        console.log(error)
        console.log('Unable to create Test, Please select correct number of questions')
        res.status(500).json({ error: "Internal Server Error" })
      } 
    }
});

app.get('/myprofile', middleware, async (req, res) => {
  try {
    let exist = await Evaluator.find({ id: req.user.id, email: req.user.email });
    if (!exist) {
      return res.status(400).send('User not found');
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error")
  }
});


//instructions page
  app.get('/instructions',middleware,async(req,res)=>{
      try{
      let exist = await Candidate.find({email:req.user.email });
    if(!exist){
      return res.status(500).send('candidate not found')
    }
    res.json(exist)
    } catch(err){
      console.log(err)
      return res.status(500).send('server error')
    }
    })

 app.post('/testresults', async(req, res) => {
      try {
        // Create a new instance of the TestResults model
        const testresults = new TestResults(req.body);
    
        // Save the new instance to the database
        await testresults.save();
        // Return the new instance as a JSON response
        res.json(testresults);
      } catch (err) {
        console.log(err); // log the error message
        return res.status(500).send("Server Error");
      }
    });
    
//update the candidate
app.put('/edit/:id', async (req, res) => { 
  try {
    const { email, testStatus } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { email, testStatus }, { new: true });
    if (!candidate) {
      return res.status(404).send('Candidate not found');
    }
    res.status(200).send('Candidate updated successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

//delete the selected candidate
// app.delete('/delete/:id', async (req, res) => {
//   try {
//     const candidate = await Candidate.findByIdAndDelete(req.params.id);
//     if (!candidate) {
//       return res.status(404).send('Candidate not found');
//     }
//     // await candidate.remove();
//     res.status(200).send('Candidate deleted successfully');
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send('Internal Server Error');
//   }
// });

//get all candidate emails
app.get('/all', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.status(200).send(candidates);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
      }
      });

app.patch('/updateCandidateTeststatus',async(req, res) => {
  try {
    const { email, testStatus } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
      }
      candidate.testStatus = testStatus;
      await candidate.save();
      res.status(200).json({ message: 'Test status updated successfully' });
      } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
        }
        });

app.get('/getTestResults/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    // Get the test results of a candidate from the TestResults table
    const testResults = await TestResults.find({ email: email });
    // const testresults = await TestResults.find({ email:candidate.email });
    // console.log(testResults) 
    res.status(200).json(testResults);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// Create a put request to alter and update the candidate and add a field called result and give the value "Pass"
app.post('/updateTestResult/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const result = req.body.result;
    const totalScore = req.body.totalScore;
    const codeScore = req.body.codeScore;
    const textScore = req.body.textScore;
    const mcqScore = req.body.mcqScore;
    const testResult = await TestResults.findOneAndUpdate({ email }, { result, mcqScore, codeScore, textScore,totalScore }, { new: true });
    const candidateresult = await Candidate.findOneAndUpdate({ email }, { result }, { new: true });
    if (testResult && candidateresult) {
      res.status(200).json(testResult);
    } else {
      res.status(400).json('Result storing failed');
    }
    
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// Write an API to get the Test Result of a Candidate by hitting the Test Result table
app.get('/getTestResult/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" })
    }
    const testresults = await TestResults.find({ email: candidate.email });
    console.log(testresults)
    res.status(200).json(testresults);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get('/getAllQuestions/:area', async (req, res) => {
  try {
    const area = req.params.area;
    const mcqquestions = await MCQQuestion.find({ area: area }).lean().exec();
    const paragraphquestions = await ParagraphQuestion.find({ area: area }).lean().exec();
    const allquestions = [...mcqquestions.map(q => ({ ...q, type: 'MCQ' })), ...paragraphquestions.map(q => ({ ...q, type: 'Paragraph' }))];
    console.log(allquestions);
    res.status(200).json(allquestions);
  } catch(err){
    console.log(err)
    return res.status(500).send("Server Error");
  }
})



app.listen(701, () => console.log('Server running on port 701'));
  