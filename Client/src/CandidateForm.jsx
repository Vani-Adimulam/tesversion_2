import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CandidateForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address!");
      return;
    }

    axios
      .post("http://localhost:701/register", { email })
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
      <h2>Add Candidate</h2>
        <form onSubmit={submitHandler}>
          <div style={{ width: "250px" }}>
            <label htmlFor="email">Enter Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={changeHandler}
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
