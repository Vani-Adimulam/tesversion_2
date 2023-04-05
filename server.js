// server.js


const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');
const app = express()
const cors = require('cors');
const Candidate = require('./models/Candidate');
const Evaluator = require('./models/Evaluator');

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
      jwt.sign(payload,'jwtconfidential',{expiresIn:360000},
        (err,token) =>{
            if (err) throw err;
            return res.json({token})
        }  
          )

  }
  catch(err){
      console.log(err);
      return res.status(500).send('Server Error')
  }
})


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
      let exist = await Evaluator.findById(req.user.id);
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
