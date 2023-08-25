// import React, { useState } from 'react'

// const LogIn = () => {
//   const [activateTab,setActiveTab]=useState("")
//   // console.log(setActiveTab("login"))
//   // const activateTab="login"

//   return (

//   )
// }

// export default LogIn
import React, { useState, useEffect } from "react";

import EvaluatorForm from "./EvaluatorForm";
import CandidateLogin from "./CandidateLogin";
import BG from './assets/10-Online-Examination-Software-Features-That-Make-Online-Exams-A-Breeze-01.png'
import Registrationform from "./Registrationform";

const LogIn = () => {
  const [selectedOption, setSelectedOption] = useState("evaluator");
  console.log(selectedOption)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <div style={{ marginTop: "100px", }}>
          <div style={{ width: "50%", margin: "0px auto" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "" ,padding:"10px"}} onClick={() => setSelectedOption("candidate")}>
                <div>
                  <input
                    type="radio"
                    id="candidate"
                    name="login-option"
                    value="candidate"
                    checked={selectedOption === "candidate"}
                    onChange={handleOptionChange}
                  />
                  <label onMouseOver={(e)=> e.target.style.cursor = "pointer"} style={selectedOption==="candidate" ? {fontWeight:"900"}:{fontWeight:"400"}} htmlFor="candidate" className="lead">
                    Candidate
                  </label>

                </div>

              </div>
              <div style={{ width: "",padding:"10px" }} onClick={() => {
                setSelectedOption("elalutator")
              }
              }>
                <div>
                  <input
                    type="radio"
                    id="evaluator"
                    name="login-option"
                    value="evaluator"
                    checked={selectedOption === "evaluator"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="evaluator" className="lead" onMouseOver={(e)=> e.target.style.cursor = "pointer"} style={selectedOption==="evaluator" ? {fontWeight:"900"}:{fontWeight:"400"}}>
                    Evaluator
                  </label>
                </div>
              </div>

              <div style={{ width: "",padding:"10px" }} onClick={() => {
                setSelectedOption("registration")

              }
              }><input
                  type="radio"
                  id="registration"
                  name="login-option"
                  value="registration"
                  checked={selectedOption === "registration"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="registration"  className="lead" onMouseOver={(e)=> e.target.style.cursor = "pointer"} style={selectedOption==="registration" ? {fontWeight:"900"}:{fontWeight:"400"}}>
                  Registration
                </label></div>
            </div>
            <hr />
            <div>
              {selectedOption === "candidate" && <CandidateLogin />}
              {selectedOption === "registration" && <Registrationform />}
              {selectedOption === "evaluator" && <EvaluatorForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
