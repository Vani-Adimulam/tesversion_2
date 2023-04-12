import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MCQQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:701/getMCQQuestionsforTest')
      .then(response => {
        setQuestions(response.data.questions);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mcq-questions-container">
      <h2>MCQ Questions</h2>
      <div className="mcq-questions-list">
  {questions.map(question => (
    <div key={question._id} className="mcq-question">
      <h3>{question.question}</h3>
      <label>
        <input type="radio" name={question._id} value={question.choice1} />
        {question.choice1}
      </label>
      <br />
      <label>
        <input type="radio" name={question._id} value={question.choice2} />
        {question.choice2}
      </label>
      <br />
      <label>
        <input type="radio" name={question._id} value={question.choice3} />
        {question.choice3}
      </label>
      <br />
      <label>
        <input type="radio" name={question._id} value={question.choice4} />
        {question.choice4}
      </label>
      <br />
      {/* create a horizontal line for every question */}
      <hr />
    </div>
  ))}
</div>

    </div>
  );
};

export default MCQQuestions;

// CSS
