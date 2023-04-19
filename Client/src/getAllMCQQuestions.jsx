import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './getAllMCQQuestions.module.scss';
import { useNavigate } from 'react-router-dom';

const AllMCQQuestions = () => {
  
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

console.log('Initial value of questions:', questions);
useEffect(() => {
  axios.get('http://localhost:701/getAllMCQQuestions')
    .then(response => {
      setQuestions(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

console.log('Updated value of questions:', questions);
  function handleNextClick() {
    navigate('../getAllParagraphQuestions')
  }

  return (
    <div className={styles.container}>
      <h2>MCQ Questions</h2>
      <div className="mcq-questions-list">
  {questions.map(question => (
    <div key={question._id} className="mcq-question">
      <h3>{question.question}</h3>
      <label>
        <input type="radio" name={question._id} value={1}
        checked={question.correct_choice==="1"}
        />
        {question.choice1}
      </label>
      <br />
      <label>
        <input type="radio" name={question._id} value={2} 
        checked={question.correct_choice === "2"}/>
        {question.choice2}
      </label>
      <br />
      <label>
        <input type="radio" name={question._id} value={3} 
        checked={question.correct_choice === "3"}/>
        {question.choice3}
      </label>
      <br />
      <label>
        <input type="radio" name={question._id} value={4} 
        checked={question.correct_choice === "4"}/>
        {question.choice4}
      </label>
      <br />
      {/* create a horizontal line for every question */}
      <hr />
    </div>
  ))}
</div>
        <div>
            <button className="btn btn-primary" onClick={handleNextClick}>Next</button>
        </div>
    </div>
  );
};

export default AllMCQQuestions;
