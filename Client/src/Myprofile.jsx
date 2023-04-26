import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { store } from "./App";
import { Navigate } from "react-router";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import McqForm from "./McqForm";
import AddParagraphQuestionForm from "./AddParagraphQuestionForm"
const MyProfile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:701/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [token]);
  if (!token) {
    return <Navigate to="/login" />;
  }
  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
  };
  // const handleAddQuestion = () => {
  //   setSelectedQuestionType(null); // reset selectedQuestionType to null
  // };
  return (
    <div>
      {data && (
        <center>
          <br />
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Welcome Evaluator</h5>
              <br />
              <button
                style={{ backgroundColor: "#F19E18", fontFamily: "fantasy" }}
                className="btn"
                onClick={() => setToken(null)}
              >
                Logout
              </button>
            </div>
            <div className="card-body">
            <Link to="/CandidateList"
              className="btn"
              style={{
                  marginLeft: "5px",
                  backgroundColor: "#F1F2F4",
                  fontFamily: "fantasy",
                  marginTop:"2px"
                }}
              >
              Manage Candidate
              </Link>
            </div>
            <div className="card-body">
            <Link
                to="/CandidateForm"
                className="btn"
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#989898",
                  fontFamily: "fantasy",
                }}
              >
                Add Candidate
              </Link>
            </div>
            <div className="card-body">
            <Link
                to="/getAllMCQQuestions"
                className="btn"
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#989898",
                  fontFamily: "fantasy",
                }}
              >
                View Questions
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form style={{ width: "50rem" }}>
              <Form.Group controlId="questionTypeSelect">
                <Form.Label
                  style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
                >Want To Add Question?
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedQuestionType}
                  onChange={handleQuestionTypeChange}
                  style={{marginBottom:"10px"}}
                >
                  <option value="">Select a question type</option>
                  <option value="MCQ">MCQ</option>
                  <option value="TEXT">Paragraph</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
          {selectedQuestionType === "TEXT" && <AddParagraphQuestionForm />}
          {selectedQuestionType === "MCQ" && <McqForm />}
        </center>
      )}
    </div>
  );
};
export default MyProfile;