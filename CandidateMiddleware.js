const jwt = require("jsonwebtoken");
//jwt for candidate
const CandidateFunction = () => {
  try {
    let token = req.header("y-token");
    if (!token) {
      return res.status(400).send("Token Not found");
    }
    let decode1 = jwt.verify(token, process.env.JWT_SECRET1);
    req.user = decode1.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid token");
  }
};

module.exports = (CandidateFunction);