// server.js


const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');
const app = express()
const cors = require('cors');
const Candidate = require('./models/Candidate');
const Evaluator = require('./models/Evaluator');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
require('dotenv').config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://gorantlasantoshkumarreddy:assessment123@cluster0.fjz3f0l.mongodb.net/?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex  : true
}).then(
    () => console.log('DB Connection established')
)

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
  }
  catch(err){
      console.log(err);
      return res.status(500).send('Server Error')
  }
})

app.listen(701, () => console.log('Server running on port 701'));
