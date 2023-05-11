import React, { useState } from "react";
import EvaluatorForm from "./EvaluatorForm";
import CandidateLogin from "./CandidateLogin";

const LogIn = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <center>
      <div style={{ marginTop: "90px",
      backgroundImage: "url('./assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash (1).jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover" }}>
        <h1 className="display-3">Login</h1>
        <div>
          <input
            type="radio"
            id="evaluator"
            name="login-option"
            value="evaluator"
            checked={selectedOption === "evaluator"}
            onChange={handleOptionChange}
          />
          <label htmlFor="evaluator" className="lead">Evaluator</label>
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
          <label htmlFor="candidate" className="lead">Candidate</label>
        </div>
        {selectedOption === "evaluator" && <EvaluatorForm />}
        {selectedOption === "candidate" && <CandidateLogin />}
      </div>
    </center>
  );
};

export default LogIn;
