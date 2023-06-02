import axios from "axios";
import { useEffect, useState } from "react";
import './EvalQuestions.css'
import { useLocation, useNavigate } from "react-router";
import { BASE_URL } from "./Service/helper";
import { Button } from "react-bootstrap";


const EvalQuestions = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [candidate, setCandidate] = useState([]);
  const [result, setResult] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);


  let mcqScore = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;

  const location = useLocation();
  const email = location.state.email;
  const testStatus = location.state.testStatus;
  const isEvaluated = testStatus === 'Evaluated';
  useEffect(() => {
    axios.get(`${BASE_URL}/getTestResults?emails=${email}`)
      .then(response => {
        setTestResults(response.data);
        const selectedAnswers = response.data[0].selectedAnswers;
        const totalQuestions = Object.keys(selectedAnswers).length;
        setTotal(totalQuestions);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/getCandidateDetails/${email}`)
      .then(response => {
        // console.log(response.data[0]);
        setCandidate(response.data[0]);
        console.log(candidate);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (testResults.length > 0) {
      // console.log('This is the testResults: ', testResults);
      const selectedAnswersIds = testResults.flatMap(result => Object.keys(result.selectedAnswers));
      // console.log('Selected answers Ids: ', selectedAnswersIds);
      axios.get(`${BASE_URL}/getMCQQuestions`, {
        params: {
          ids: selectedAnswersIds.join(",")
        }
      })
        .then(response => {
          setMCQQuestions(response.data);
          // console.log(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [testResults]);

  useEffect(() => {
    if (isEvaluated) {
      // Disable the Evaluate button
      const testResult = location.state.result;
      console.log(testResult)
      console.log(result)
      const PassButton = document.getElementById('evaluate-pass');
      const FailButton = document.getElementById('evaluate-fail');

      if (testResult === "Pass") {
        if (FailButton) {
          FailButton.parentNode.removeChild(FailButton);
        }
        PassButton.disabled = true;
      }
      if (testResult === "Fail") {
        if (PassButton) {
          PassButton.parentNode.removeChild(PassButton);
        }
        FailButton.disabled = true;
      }


    }
  }, [isEvaluated]);

  function handleProfileClick() {
    navigate("/myprofiledashboard");
  }

  async function updateCandidateResult(result, email) {
    try {
      const response = await fetch(
        `${BASE_URL}/updateTestResult/${email.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result,
            mcqScore
            // ,codeScore,
            // textScore,
            // totalScore,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update candidate result.");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <div style={{ marginTop: '90px' }}>
      <header className="bg-#D6D6D6 text-dark p-3">
        <h1>Test Evaluation</h1>
      </header>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="btn"
          style={{ backgroundColor: "#015D88", fontFamily: "fantasy" }}
          onClick={handleProfileClick}
        >
          Back To Dashboard
        </button>
      </div>
      <h1 style={{ backgroundColor: '#f8f9fa' }}>Candidate: {email}</h1>
      <ol style={{ paddingLeft: "0", marginTop: "30px" }}>
        {mcqQuestions.map((question) => {
          const selectedAnswer = testResults[0].selectedAnswers[question._id];
          const isCorrect = selectedAnswer === question.correct_choice;
          if (isCorrect) {
            mcqScore++;
            correctAnswers++;
          } else {
            wrongAnswers++;
          }

          return (
            <li key={question._id} style={{ marginBottom: "30px" }}>
              <div className="card">
                <div className="card-body">
                  <h3>{question.question}</h3>
                  <p style={{ marginBottom: "10px" }}>
                    Correct answer: {question.correct_choice}
                  </p>
                  <div className="form-check" style={{ marginBottom: "10px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={question._id}
                      value={1}
                      defaultChecked={selectedAnswer === 1}
                    />
                    <label className="form-check-label">{question.choice1}</label>
                  </div>
                  <div className="form-check" style={{ marginBottom: "10px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={question._id}
                      value={2}
                      defaultChecked={selectedAnswer === 2}
                    />
                    <label className="form-check-label">{question.choice2}</label>
                  </div>
                  <div className="form-check" style={{ marginBottom: "10px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={question._id}
                      value={3}
                      defaultChecked={selectedAnswer === 3}
                    />
                    <label className="form-check-label">{question.choice3}</label>
                  </div>
                  <div className="form-check" style={{ marginBottom: "20px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={question._id}
                      value={4}
                      defaultChecked={selectedAnswer === 4}
                    />
                    <label className="form-check-label">{question.choice4}</label>
                  </div>
                  <span id={`symbol-${question._id}`} className="symbol">
                    {isCorrect ? (
                      <span
                        style={{
                          color: "#28a745",
                          fontWeight: "bold",
                          marginRight: "5px",
                        }}
                      >
                        &#10004; Correct
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#dc3545",
                          fontWeight: "bold",
                          marginRight: "5px",
                        }}
                      >
                        &#10008; Wrong
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
        <h4 style={{ display: 'flex', justifyContent: 'space-around' }}>
          <span>Correct Answers: {correctAnswers}</span>
          <span>Wrong Answers: {wrongAnswers}</span>
          <span>Score: {mcqScore} / {total}</span>
        </h4>

      </ol>
      <center>
        <div>
          {/* <button
            type="submit"
            className="btn"
            id={`evaluate-all`}
            style={{ backgroundColor: "#A4B3C4" }}
            onClick={() => {
              console.log('mcqscore:', mcqScore);
              console.log('total marks', mcqScore);
              // Navigate to the summary page
              navigate('/summary', {
                state: {
                  email,
                  mcqScore,
                  totalScore: mcqScore,
                  total: total,
                },
              });

              


            }}
          >
            Evaluate
          </button> */}

          <Button
            id={`evaluate-pass`}
            variant="success"
            style={{ marginRight: "10px" }}
            onClick={() => {
              setResult("Pass");
              updateCandidateResult("Pass", { email });
              setIsButtonClicked(true);
              navigate("/CandidateList");
              window.location.reload();
            }}
            disabled={isButtonClicked}
          >
            Pass
          </Button>

          <Button
            id={`evaluate-fail`}
            variant="danger"
            onClick={() => {
              setResult("Fail");
              updateCandidateResult("Fail", { email });
              setIsButtonClicked(true);
              navigate("/CandidateList");
              window.location.reload();
            }}
            disabled={isButtonClicked}
          >
            Fail
          </Button>

        </div>
      </center>
    </div>
  );
};

export default EvalQuestions;
