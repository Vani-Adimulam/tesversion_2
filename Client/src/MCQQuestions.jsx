import React, { useState } from 'react';
import axios from 'axios';

const MCQTest = () => {
  const [areaIndex, setAreaIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleAreaChange = (event) => {
    setAreaIndex(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://localhost:701/getMCQQuestionsforTest/:${areaIndex}`);
      setQuestions(response.data.questions);
      console.log(questions)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label>
        Select an area:
        <select value={areaIndex} onChange={handleAreaChange}>
          <option value={0}>VLSI</option>
          <option value={1}>SOFTWARE</option>
          <option value={2}>EMBEDDED</option>
        </select>
      </label>
      <button onClick={handleButtonClick}>Start Test</button>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>{question.question}</h3>
          <ul>
            {questions.length>0 && questions.choices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MCQTest;
