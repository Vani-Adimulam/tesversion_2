const jwt = require("jsonwebtoken");
//jwt for evaluator
const Evaluatorfunction = (req, res, next) => {
  try {
    let token = req.header("x-token");
    if (!token) {
      return res.status(400).send("Token Not found");
    }
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid token");
  }
};

//jwt for candidate
// const CandidateFunction = () => {
//   try {
//     let token1 = req.header("y-token");
//     if (!token1) {
//       return res.status(400).send("Token Not found");
//     }
//     let decode1 = jwt.verify(token1, process.env.JWT_SECRET1);
//     req.user = decode1.user;
//     next();
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("Invalid token");
//   }
// };

module.exports = (Evaluatorfunction);
