import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MCQQuestions = () => {
  const navigate = useNavigate();
  const [mcqquestions, setMCQQuestions] = useState(JSON.parse(localStorage.getItem('mcqquestions'))||[])
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem('selectedAnswers')) || {}
  );
  const [hasFetched, setHasFetched] = useState(localStorage.getItem('hasFetched')||false);
  const [providedAnswers] = useState(
    JSON.parse(localStorage.getItem("providedAnswers")) || {}
  );
  let areaIndex = JSON.parse(localStorage.getItem('areaIndex'))
  useEffect(() => {
    if(!hasFetched){
      axios.get(`http://localhost:701/getMCQQuestionsforTest/${areaIndex}`)
        .then(response => {
          localStorage.setItem('mcqquestions',
          JSON.stringify(response.data.questions));
          setMCQQuestions(response.data.questions);
          setHasFetched(true);
          localStorage.setItem('hasFetched',true)
        })
        .catch(error => {
          console.log(error);
        });
      }
  },[hasFetched])
  // useEffect(() => {
  //   console.log(mcqquestions)
  // })
  function handleNextClick() {
    // console.log(mcqquestions);
    navigate('../getParagraphQuestions',{ state: { selectedAnswers, providedAnswers } })
  }
  function handleRadioChange(event, questionId) {
    const selectedAnswer = event.target.value;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedAnswer
    });
    localStorage.setItem('selectedAnswers', JSON.stringify({
      ...selectedAnswers,
      [questionId]: selectedAnswer
    }));
  }
  return (
    <div>
      <h2 style={{marginTop:"90px"}}>MCQ Questions</h2>
      <div className="mcq-questions-list">
        {mcqquestions.map((question) => (
          <div key={question._id} className="mcq-question">
            <h3>{question.question}</h3>
            <label>
              <input
                type="radio"
                name={question._id}
                value={1}
                checked={selectedAnswers[question._id] == 1}
                onChange={(e) => handleRadioChange(e, question._id)}
              />
              {question.choice1}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={question._id}
                value={2}
                checked={selectedAnswers[question._id] == 2}
                onChange={(e) => handleRadioChange(e, question._id)}
              />
              {question.choice2}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={question._id}
                value={3}
                checked={selectedAnswers[question._id] == 3}
                onChange={(e) => handleRadioChange(e, question._id)}
              />
              {question.choice3}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={question._id}
                value={4}
                checked={selectedAnswers[question._id] == 4}
                onChange={(e) => handleRadioChange(e, question._id)}
              />
              {question.choice4}
            </label>
            <br />
            <hr />
          </div>
        ))}
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};
export default MCQQuestions;