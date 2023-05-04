import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CandidateForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("SOFTWARE")
  const [errorMessage, setErrorMessage] = useState("");
  const [mcqCount, setMcqCount] = useState(0);
  const [codeCount, setcodeCount] = useState(0);
  const [paragraphCount, setParagraphcount] = useState(0)
  const [passPercentage, setPassPercentage] = useState(0);

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeNameHandler = (e) => {
    setName(e.target.value);
  }

  const changeAreaHandler = (e) => {
    setArea(e.target.value);
  }

  const changeMcqCountHandler = (e) => {
    setMcqCount(e.target.value)
  }

  const changeCodeCountHandler = (e) => {
    setcodeCount(e.target.value);
  }
  
  const changeParagraphCountHandler = (e) => {
    setParagraphcount(e.target.value)
  }

  const changePassPercentageHandler = (e) => {
    setPassPercentage(e.target.value);
  }

  const submitHandler = (e) => {
    console.log(area)
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address!");
      return;
    }

    axios
      .post("http://localhost:701/register", { email, name, area, mcqCount, codeCount, paragraphCount, passPercentage})
      .then((res) => {
        alert(res.data);
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error occurred while registering");
      });
  };


  return (
    <div className="container">
      <center>
      <h2 style={{marginTop:"90px"}}>Add Candidate</h2>
        <form onSubmit={submitHandler}>
        <div style={{ width: "250px" }}>
            <label htmlFor="email">Enter Name : </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={changeNameHandler}
            />
          </div>
          <br />
          <div style={{ width: "250px" }}>
            <label htmlFor="email">Enter Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={changeEmailHandler}
            />
          </div>
          <br />
          <div style={{ width: "250px" }}>
          <label for="area">Select Area : </label>
          <select name="area" id="area" onChange={changeAreaHandler} defaultValue="SOFTWARE">
            <option value="SOFTWARE">SOFTWARE</option>
            <option value="EMBEDDED">EMBEDDED</option>
            <option value="VLSI">VLSI</option>
          </select>
          </div>
          <br />
          {/* Add a button to input a numerical value starting from 5 and ending at 10 */}
          <div style={{ width: "250px" }}>
            <label for="mcqcount">Set MCQ count:</label>
            <input
            type="number"
            className="form-control"
            id="mcqcount"
            placeholder="Enter MCQ count"
            // change min value and max value that can be entered
            min={5}
            max={10}
            onChange={changeMcqCountHandler}
            />
          </div>
          <br />
          <div style={{ width: "250px" }}>
            <label for="codecount">Set Code Questions count:</label>
            <input
            type="number"
            className="form-control"
            id="codecount"
            placeholder="Enter Code Questions count"
            min={5}
            max={10}
            onChange={changeCodeCountHandler}
            />
          </div>
          <br />
          <div style={{ width: "250px" }}>
            <label for="codecount">Set Paragraph Questions count:</label>
            <input
            type="number"
            className="form-control"
            id="codecount"
            placeholder="Enter Paragraph Questions count"
            min={5}
            max={10}
            onChange={changeParagraphCountHandler}
            />
          </div>
          <br />
          <div style={{ width: "250px" }}>
            <label for="passpercentage">Set Pass percentage:</label>
            <input
            type="number"
            className="form-control"
            id="passpercentage"
            placeholder="Values between 0 and 100"
            min={0}
            max={100}
            onChange={changePassPercentageHandler}
          />
          </div>
          <button type="submit" className="btn btn-dark mt-3">
            ADD
          </button>
          {errorMessage && (
            <div className="mt-3 text-center text-danger">{errorMessage}</div>
          )}
        </form>
      </center>
    </div>
  );
};

export default CandidateForm;
