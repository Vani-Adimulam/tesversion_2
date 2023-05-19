import axios from "axios";
import { useEffect, useState } from "react";
import './EvalQuestions.css'
import { useLocation, useNavigate } from "react-router";
import { ListGroup, Form, Row, Col } from "react-bootstrap";
import { BASE_URL } from "./Service/helper";


const EvalQuestions = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [paragraphQuestions, setParagraphQuestions] = useState([]);
  // const [result, setResult] = useState([])
  const [total, setTotal] = useState(0);
  const [candidate, setCandidate] = useState([])
  let mcqScore = 0;

  const [textScore,setTextScore] = useState(0)
  const [codeScore,setCodeScore] = useState(0)

  

  const location = useLocation();
  const email = location.state.email;
  const testStatus = location.state.testStatus;
  const isEvaluated = testStatus === 'Evaluated';

  useEffect(() => {
    axios.get(`${BASE_URL}/getTestResults/${email}`)
      .then(response => {
        setTestResults(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(()=>{
    axios.get(`${BASE_URL}/getCandidateDetails/${email}`)
    .then(response => {
      console.log(response.data[0])
      setCandidate(response.data[0])
      console.log(candidate)
      setTotal(response.data[0].mcqCount*1 + response.data[0].codeCount*5 + response.data[0].paragraphCount*5)
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  useEffect(() => {
    if (testResults.length > 0) {
      console.log('This is the testResults : ',testResults)
      const selectedAnswersIds = testResults.flatMap(result => Object.keys(result.selectedAnswers));
      console.log('Selected answers Ids : ',selectedAnswersIds)
      const providedAnswersIds = testResults.flatMap(result => Object.keys(result.providedAnswers))
      console.log('This is provided answers ids ',providedAnswersIds)
      axios.all([
        axios.get(`${BASE_URL}/getMCQQuestions`,{
          params : {
            ids: selectedAnswersIds.join(",")
          }
        }),
        axios.get(`${BASE_URL}/getParagraphQuestions`,{
          params : {
            ids: providedAnswersIds.join(",")
          }
        })
      ])
      .then(axios.spread((mcqQuestionsResponse, paragraphQuestionsResponse) => {
        setMCQQuestions(mcqQuestionsResponse.data)
        setParagraphQuestions(paragraphQuestionsResponse.data)
        console.log(paragraphQuestionsResponse.data)
      }))
      .catch(error => console.error(error));
    }
  }, [testResults]);
  
  const handleParagraphQuestion = (event) => {
    const dropdownMenu = event.target;
    const selectedMark = dropdownMenu.value;
    const questionId = dropdownMenu.id.split("-")[1];
    const question = paragraphQuestions.find((q) => q._id === questionId);
    
    // Disable the dropdown menu
    dropdownMenu.disabled = true;
    
    if (question.subtype === "code") {
      // Update the code score
      setCodeScore((codeScore) => codeScore + parseInt(selectedMark));
    } else if (question.subtype === "text") {
      // Update the text score
      setTextScore((textScore) => textScore + parseInt(selectedMark));
    }
  };
  
  useEffect(() => {
    if (isEvaluated) {
      // Disable the Evaluate button
      const evaluateButton = document.getElementById('evaluate-all');
      evaluateButton.disabled = true;
  
      // Disable the dropdowns
      const dropdowns = document.querySelectorAll(".paragraph-question select");
      for (const dropdown of dropdowns) {
        dropdown.disabled = true;
      }
    }
  }, [isEvaluated, paragraphQuestions]);  
  
  return (
    <div style={{marginTop: '90px'}}>
    <header className="bg-#D6D6D6 text-dark p-3">
        <h1>Test Evaluation</h1>
      </header>
        <h1 style={{ backgroundColor: '#f8f9fa' }}>Candidate: {email}</h1>
<ol style={{ paddingLeft: "0", marginTop: "30px" }}>
  {mcqQuestions.map((question) => (
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
              defaultChecked={testResults[0].selectedAnswers[question._id] == 1}
            />
            <label className="form-check-label">{question.choice1}</label>
          </div>
          <div className="form-check" style={{ marginBottom: "10px" }}>
            <input
              className="form-check-input"
              type="radio"
              name={question._id}
              value={2}
              defaultChecked={testResults[0].selectedAnswers[question._id] == 2}
            />
            <label className="form-check-label">{question.choice2}</label>
          </div>
          <div className="form-check" style={{ marginBottom: "10px" }}>
            <input
              className="form-check-input"
              type="radio"
              name={question._id}
              value={3}
              defaultChecked={testResults[0].selectedAnswers[question._id] == 3}
            />
            <label className="form-check-label">{question.choice3}</label>
          </div>
          <div className="form-check" style={{ marginBottom: "20px" }}>
            <input
              className="form-check-input"
              type="radio"
              name={question._id}
              value={4}
              defaultChecked={testResults[0].selectedAnswers[question._id] == 4}
            />
            <label className="form-check-label">{question.choice4}</label>
          </div>
          <span id={`symbol-${question._id}`} className="symbol">
            {testResults[0].selectedAnswers[question._id] ==
            question.correct_choice ? (
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
  ))}
  {mcqQuestions.map((question)=>{
          testResults[0].selectedAnswers[question._id] == question.correct_choice ? mcqScore++ : null;
        })}
        <h4>MCQ Score : {mcqScore}</h4>
</ol>
      <h1>Evaluate Theory And Technical Questions</h1>
      <ListGroup>
      {paragraphQuestions.map((question) => (
        <ListGroup.Item key={question._id}>
          <h3>{question.question} (Type : {question.subtype})</h3>
          <Row>
            <Col>
              <div className="answer-wrapper">
                <div className="correct-answer" style={{width:'400px'}}>
                  <p>Correct Answer:</p>
                  <Form.Control
                    as="textarea"
                    name="correct-answer"
                    value={question.answer}
                    rows={5}
                    readOnly
                  />
                </div>
                <div className="given-answer" style={{width:'400px'}}>
                  <p>Given Answer:</p>
                  <Form.Control
                    as="textarea"
                    name="given-answer"
                    value={testResults[0].providedAnswers[question._id]}
                    rows={5}
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Select marks (0 to 5)</Form.Label>
                <Form.Control
                  as="select"
                  name="marks"
                  id={`marks-${question._id}`}
                  // value={selectedMarks[question._id] || "0"}
                  onChange={handleParagraphQuestion}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
    <center>
      <div>
      <button type="submit"
      className="btn"
        id={`evaluate-all`}
        style={{backgroundColor:"#A4B3C4"}}
        onClick={() => {
          console.log('mcqscore:', mcqScore);
          console.log('code score:', codeScore);
          console.log('text score:', textScore);
          console.log('total marks', mcqScore+textScore+codeScore)
          
          // Navigate to the summary page
          navigate('/summary', {state : {
            email,
            mcqScore,
            textScore,
            codeScore,
            totalScore: mcqScore + textScore + codeScore,
            total : total
          }});
        }}
>
  Evaluate
</button>

      </div>
      </center>
    </div>
  );
};


export default EvalQuestions;