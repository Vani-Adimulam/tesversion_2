// server.js

const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config()
const Candidate = require('./models/Candidate');
const Evaluator = require('./models/Evaluator');
const MCQQuestion = require('./models/MCQQuestions');
const ParagraphQuestion = require('./models/ParagraphQuestions');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
require('dotenv').config();
// const natural = require('natural');

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

// API to add evaluator using Postman
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
    let exist = await Candidate.findOne({ email });
    if (exist) {
      return res.send('Candidate Already Exist');
    }
    let newUser = new Candidate({ email });
    await newUser.save();
    res.status(200).send('Registered Successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});



app.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ status: 'Email not found' });
    }
    // email is verified, redirect to next page
    res.status(200).json({ status: 'Email verified' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Internal server error' });
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
    let payload = {
      user:{
        email: evaluator.email,
        id: evaluator._id
      }
      
    };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret);
    
    // Return the JWT token as a response
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

// API endpoint for adding a question to the "questions" collection
app.post('/addQuestionMCQ', async (req, res) => {
  const {area,question,choice1, choice2, choice3, choice4, correct_choice } = req.body;
  
  // Check if the question already exists
  // const existingQuestion = await MCQQuestion.findOne({ question: { $regex: question, $options: 'i' } });
  // if (existingQuestion) {
    //   return res.status(400).json({ error: 'Question already exists' });
  // }
  
  // Check if a similar question exists using Levenshtein distance fuzzy search
  // const questions = await MCQQuestion.find({});
  // const tokenizedQuestion = natural.WordTokenizer().tokenize(question.toLowerCase());
  // const minimumDistance = Math.floor(tokenizedQuestion.length / 2);
  // for (let i = 0; i < questions.length; i++) {
    //   const questionTokens = natural.WordTokenizer().tokenize(questions[i].question.toLowerCase());
    //   const distance = natural.LevenshteinDistance(tokenizedQuestion.join(''), questionTokens.join(''));
    //   if (distance <= minimumDistance) {
      //     return res.status(400).json({ error: `Similar question already exists: ${questions[i].question}` });
  //   }
  // }
  
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
  app.get('/getAllMCQQuestions', async(req, res) => {
    try {
      const questions = await MCQQuestion.find({});
      res.json(questions);
    } catch (error) {
      console.error('Error getting questions from MongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});       

// API to get Paragraph questions
app.get('/getAllParagraphQuestions', async(req, res) => {
  try {
    const questions = await ParagraphQuestion.find({});
    res.json(questions); 
  } catch (error) {
    console.error('Error getting questions from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// create an API to get random MCQ Questions from Question Bank given area
// and number
app.get('/getMCQQuestionsforTest', async(req, res) => {
  try {
    let area  = "This is area 1";
    let number  = 5;    

    const questions = await MCQQuestion.aggregate([
      { $match: { area: area } },
      { $sample: { size: Number(number) } },
      { $sort: { _id: 1 } },
      { $project: { correct_choice: 0 } } // exclude correct_choice
    ]);    
    res.json({ questions }); 
  } catch (error) {
    console.log('Unable to create Test, Please select correct number of questions')
    res.status(500).json({error:"Internal Server Error"})
  }  
});

// create an API to get random PARAGRAPH Questions from Question Bank given area
// subtype and number
app.get('/getParagraphQuestionsforTest', async(req, res) => {
  const { area, subtype, number } = req.query;
  try {
    const questions = await ParagraphQuestion.aggregate([
      { $match: { area:area , subtype: subtype } },
      { $sample: { size: Number(number) } },
      { $sort: { _id: 1 } },
      {$project : {answer: 0}} // exclude answer
    ]);
    res.json({ questions });  
  } catch (error) {
    console.log('Unable to create Test, Please select correct number of questions')
    res.status(500).json({error:"Internal Server Error"})
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
  app.listen(701, () => console.log('Server running on port 701'));
  