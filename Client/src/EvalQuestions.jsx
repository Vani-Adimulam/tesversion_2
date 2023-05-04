import axios from "axios";
import { useEffect, useState } from "react";
import './EvalQuestions.css'
import { useLocation, useNavigate } from "react-router";


const EvalQuestions = () => {
  const [testResults, setTestResults] = useState([]);
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [paragraphQuestions, setParagraphQuestions] = useState([]);
  const [result,setResult] = useState([])

  const location = useLocation();
  const email = location.state.email;
  let totalScore = 0;
  const [finalScore,setFinalScore] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:701/getTestResults/${email}`)
      .then(response => {
        setTestResults(response.data)
        // console.log(testResults)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const selectedAnswersIds = testResults.map(result => Object.keys(result.selectedAnswers));
    axios.get('http://localhost:701/getMCQQuestions', {
      params: {
        ids: selectedAnswersIds.join(",") // Convert the array to a string with comma-separated values
      }
    })
      .then(response => {
        setMCQQuestions(response.data)
      })
      .catch(error => {
        // handle error
        console.log(error)
      })

  }, [testResults])

  useEffect(() => {
    const providedAnswersIds = testResults.map(result => Object.keys(result.providedAnswers))
    axios.get('http://localhost:701/getParagraphQuestions', {
      params: {
        ids: providedAnswersIds.join(",") //Convert the array to a string with comma-separated values
      }
    })
      .then(response => {
        setParagraphQuestions(response.data)
      })
  }, [testResults])

  useEffect(()=>{ 
    if(testResults[0].totalScore){
      setFinalScore(testResults[0].totalScore)
      if(testResults[0].totalScore<15){
        setResult("Fail")
      }
      else{
        setResult("Pass")
      }
    }
    console.log(testResults)
  })

  const evaluateMCQQuestion = (question, correctChoice, selectedChoice) => { 

    // your code to evaluate the question goes here
    if (selectedChoice === correctChoice) {
      totalScore += 1;
      console.log("Candidate answered correct");

      // add the tick mark symbol
      const symbolElement = document.getElementById(`symbol-${question._id}`);
      symbolElement.innerHTML = "&#10004;" + " " + "Correct"; // tick mark symbol
      symbolElement.classList.add("correct");
    } else {
      console.log("Candidate answered incorrectly");

      // add the cross mark symbol
      const symbolElement = document.getElementById(`symbol-${question._id}`);
      symbolElement.innerHTML = "&#10008;" + " " + "Wrong"; // cross mark symbol
      symbolElement.classList.add("incorrect");
    }

    // disable the evaluate button
    const button = document.getElementById(`evaluate-${question._id}`);
    button.disabled = true;

    // console.log(totalScore);
  };

  const evaluateParagraphQuestion = (question, marks) => {

    // your code to evaluate the question goes here
    
    totalScore+=Number(marks);

    // disable the evaluate button
    const button = document.getElementById(`evaluate-${question._id}`);
    button.disabled = true;

    // console.log(totalScore);
  };

  function handleResult(result) {
    console.log(result)
    
    axios.put(`http://localhost:701/updateTestResult/${email}`, {
      method: 'PUT',
      body : { result , totalScore}
    })
      .then(response => response.json)
      .then(data => {
        console.log(data); // Handle the response from the server
      })
      .catch(error => {
        console.error(error); // Handle any errors that occurred during the request
      });
    
    const button = document.getElementById(`evaluate-all`)
    button.disabled = true;
    navigate('/CandidateList')
    window.location.reload()

  }
  
  

  // Render the MCQQuestion with radio buttons for choices and Paragraph Questions along with the correct
  // answer and provided answer.
  return (
    <div>
      <h1>Candidate : {email}</h1>
<hr />
<br />
<h2>Evaluate MCQQuestions</h2>
<br />
<ol>
  {mcqQuestions.map((question) => (
    <li key={question._id}>
      <div className="card">
        <div className="card-body">
          <h3>{question.question}</h3>
          <p>
            correct answer : {question.correct_choice}
          </p>
          <label>
            <input
              type="radio"
              name={question._id}
              value={1}
              checked={testResults[0].selectedAnswers[question._id] == 1}
            />
            {question.choice1}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name={question._id}
              value={2}
              checked={testResults[0].selectedAnswers[question._id] == 2}

            />
            {question.choice2}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name={question._id}
              value={3}
              checked={testResults[0].selectedAnswers[question._id] == 3}
            />
            {question.choice3}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name={question._id}
              value={4}
              checked={testResults[0].selectedAnswers[question._id] == 4}

            />
            {question.choice4}
          </label>
          <br />
          <span id={`symbol-${question._id}`} className="symbol"></span>
          <br />
          <br />
          <button type="submit"
          // className="buttonE"
            id={`evaluate-${question._id}`}
            onClick={
              () => evaluateMCQQuestion(question, question.correct_choice, testResults[0].selectedAnswers[question._id])}
          >
            Evaluate
          </button>
        </div>
      </div>
      <br />
    </li>
  ))}
</ol>

      <hr />
      <h1>Evaluate Paragraph Questions</h1>
      <br />
      <ol>
        {paragraphQuestions.map((question) => (
          <li>
            <div key={question._id} className="paragraph-question">
              <h3>{question.question}</h3>
              <div className="answer-wrapper">
                <div className="correct-answer">
                  <p>Correct Answer:</p>
                  <textarea name="correct-answer" value={question.answer} rows="15" cols="30" readOnly />
                </div>
                <div className="given-answer">
                  <p>Given Answer:</p>
                  <textarea name="given-answer" value={testResults[0].providedAnswers[question._id]} rows="15" cols="30" readOnly />
                </div>
                <br />
              </div>
              <br />
              <p>Select marks zero to five : </p>
              
              <select name="marks" id={`marks-${question._id}`}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <br />
              <br />
              <button type="submit"
              // className="buttonE"
                id={`evaluate-${question._id}`}
                onClick={
                  
                  () => {
                    const marks = document.getElementById(`marks-${question._id}`).value;
                    evaluateParagraphQuestion(question, marks)
                  }
                  }
              >
                Evaluate
              </button>
              <br />
            </div>
            <br />            
          </li>
          
        ))}
      </ol>
      <div>
        <button type="submit"
        // className="buttonE"
          id={`evaluate-all`}
          onClick={
            () => {
              const marks = totalScore
              
              if(marks < 15){
                alert("Fail");
                const result = "Fail"
                // alter the candiate table, add a field result and store result as "Pass"
                handleResult(result);
              }
              else
              {
                alert('Pass')
                const result = "Pass"
                handleResult(result);
              }
            }
          }
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  );
};


export default EvalQuestions;