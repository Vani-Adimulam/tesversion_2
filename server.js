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

// Route to authenticate an evaluator
app.post('/login',async (req, res) => {
  try{
      const {email,password} = req.body;
      let exist = await Evaluator.findOne({email});
      if(!exist) {
          
          return res.status(400).send('User Not Found');
          
      }
      if(exist.password !== password) {
         
          return res.status(400).send('Invalid credentials');
      }
      let payload = {
          user:{
              id : exist.id
          }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
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

app.get('/myprofile',middleware,async(req, res)=>{
  try{
      let exist = await Evaluator.find({id: req.user.id,email : req.user.email});
      if(!exist){
          return res.status(400).send('User not found');
      }
      res.json(exist);


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


app.listen(701,()=>{
  console.log("server running")
})


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


app.listen(701,()=>{
  console.log("server running")
})