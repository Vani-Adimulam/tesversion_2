import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "./Service/helper";

const CandidateForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mcqCount, setMcqCount] = useState(0);
  const [codeCount, setcodeCount] = useState(0);
  const [paragraphCount, setParagraphcount] = useState(0);

  const resetForm = () => {
    setName("");
    setEmail("");
    setArea("");
    setMcqCount("");
    setcodeCount("");
    setParagraphcount("");
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeAreaHandler = (e) => {
    setArea(e.target.value);
  };

  // const changeMcqCountHandler = (e) => {
  //   setMcqCount(e.target.value);
  // };

  // const changeCodeCountHandler = (e) => {
  //   setcodeCount(e.target.value);
  // };

  // const changeParagraphCountHandler = (e) => {
  //   setParagraphcount(e.target.value);
  // };
  const navigate = useNavigate()
  function handleProfileClick() {
    navigate("/myprofiledashboard");
  }

  const submitHandler = (e) => {
    e.preventDefault();
  
    // Trim the input values to remove leading and trailing spaces
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedArea = area.trim();
    
    // Check if any of the trimmed input values are empty strings
    if (trimmedEmail === "" || trimmedName === "" || trimmedArea === "") {
      setErrorMessage("Invalid input. Please fill in all fields.");
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Invalid email address!");
      return;
    }
  
    axios
      .post(`${BASE_URL}/register`, {
        email: trimmedEmail,
        name: trimmedName,
        area: trimmedArea,
        mcqCount,
        codeCount,
        paragraphCount,
      })
      .then((res) => {
        toast.success(res.data);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error occurred while registering");
      });
  };
  return (
    <center>
      <div className="container" style={{ marginTop: "90px"}}>
        <div
          className="card mt-5"
          style={{
            backgroundColor: "#f8f9fa",
            border: "none",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            width: "600px",
            height: "560px",
          }}
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Add Candidate</h2>
            <button
            className="btn"
          style={{ backgroundColor: "#6BD8BA",fontFamily:"fantasy"}}
          onClick={handleProfileClick}
        >
          Back To Dashboard
        </button>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={changeNameHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={changeEmailHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area</label>
                <select
                  className="form-control"
                  id="area"
                  value={area}
                  onChange={changeAreaHandler}
                >
                  <option value="">Select Area</option>
                  <option value="SOFTWARE">Software</option>
                  <option value="EMBEDDED">Embedded</option>
                  <option value="VLSI">VLSI</option>
                  <option value="VLSI_FRESHER">VLSI_FRESHER</option>

                </select>
              </div>

              {/* <div className="form-group">
                <label htmlFor="mcqCount">MCQ Count</label>
                <input
                  type="number"
                  className="form-control"
                  id="mcqCount"
                  placeholder="Enter MCQ count"
                  min={5}
                  max={10}
                  value={mcqCount}
                  onChange={changeMcqCountHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="codeCount">Code Questions Count</label>
                <input
                  type="number"
                  className="form-control"
                  id="codeCount"
                  placeholder="Enter Code Questions count"
                  min={5}
                  max={10}
                  value={codeCount}
                  onChange={changeCodeCountHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="paragraphCount">
                  Paragraph Questions Count
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="paragraphCount"
                  placeholder="Enter Paragraph Questions count"
                  min={5}
                  max={10}
                  value={paragraphCount}
                  onChange={changeParagraphCountHandler}
                />
              </div> */}
              <div className="form-group">
                <button type="submit" className="btn btn-dark mt-2">
                  ADD
                </button>
              </div>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </center>
  );
};

export default CandidateForm;
