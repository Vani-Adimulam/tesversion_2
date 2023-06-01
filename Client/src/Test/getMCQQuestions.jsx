import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Service/helper';

const getMCQQuestions = () => {
  const navigate = useNavigate();
  const [mcqquestions, setMCQQuestions] = useState(JSON.parse(localStorage.getItem('mcqquestions')) || []);
  const [selectedAnswers, setSelectedAnswers] = useState(JSON.parse(localStorage.getItem('selectedAnswers')) || {});
  const [hasFetched, setHasFetched] = useState(localStorage.getItem('hasFetched') || false);
  const [providedAnswers] = useState(JSON.parse(localStorage.getItem("providedAnswers")) || {});
  const email = localStorage.getItem('email');

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!hasFetched) {
      axios.get(`${BASE_URL}/getMCQQuestionsforTest/${email}`)
        .then(response => {
          localStorage.setItem('mcqquestions', JSON.stringify(response.data.questions));
          setMCQQuestions(response.data.questions);
          setHasFetched(true);
          localStorage.setItem('hasFetched', true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [hasFetched]);

  function handleBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = '';
  }

  function handleNextClick() {
    const missingAnswers = mcqquestions.some(
      (question) => !selectedAnswers[question._id]
    );

    if (missingAnswers) {
      alert('Please answer all questions before continuing.');
    } else {
      navigate('../getParagraphQuestions', {
        state: { selectedAnswers, providedAnswers },
      });
    }
  }

  function handleRadioChange(event, questionId) {
    const selectedAnswer = event.target.value;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedAnswer,
    });
    localStorage.setItem('selectedAnswers', JSON.stringify({
      ...selectedAnswers,
      [questionId]: selectedAnswer,
    }));
  }

  return (
    
      <div style={{ backgroundColor: "#BDCCDA"}}>
        <h2 style={{ marginTop: "90px" }}>MCQ Questions</h2>
        <div className="mcq-questions-list">
          {mcqquestions.map((question) => (
            <div key={question._id} className="card" style={{ width: "100%", marginTop: "10px" }}>
              <div className="card-header">
                <h3>{question.question}</h3>
              </div>
              <div className="card-body">
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
              </div>
            </div>
          ))}
        </div>
        <center>
        <div>
          <button className="btn" style={{ marginTop: "3px", backgroundColor: "#FFFFFF" }} onClick={handleNextClick}>
            Next
          </button>
        </div>
        </center>
      </div>
  );
};

export default getMCQQuestions;
