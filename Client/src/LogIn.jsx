import React, { useState } from "react";
import EvaluatorForm from "./EvaluatorForm";
import CandidateLogin from "./CandidateLogin";

const LogIn = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{marginTop:"90px"}}>
      <h2>Login</h2>
      <div>
        <input
          type="radio"
          id="evaluator"
          name="login-option"
          value="evaluator"
          checked={selectedOption === "evaluator"}
          onChange={handleOptionChange}
        />
        <label htmlFor="evaluator">Evaluator</label>
      </div>
      <div>
        <input
          type="radio"
          id="candidate"
          name="login-option"
          value="candidate"
          checked={selectedOption === "candidate"}
          onChange={handleOptionChange}
        />
        <label htmlFor="candidate">Candidate</label>
      </div>
      {selectedOption === "evaluator" && <EvaluatorForm />}
      {selectedOption === "candidate" && <CandidateLogin />}
    </div>
  );
};

export default LogIn;
