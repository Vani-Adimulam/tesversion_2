import React, { useState } from 'react';

const questions = [
  {
    question: 'What is the full form of VLSI?',
    options: ['Very Large Scale Integration', 'Variable Logic System Integration', 'Virtual Logic System Integration', 'Voltage Limited Signal Integration'],
    answer: 'Very Large Scale Integration',
  },
  {
    question: 'What is the full form of MCU?',
    options: ['Micro Controller Unit', 'Micro Computing Unit', 'Memory Control Unit', 'Micro Code Utility'],
    answer: 'Micro Controller Unit',
  },
  {
    question: 'Which of the following is a programming language?',
    options: ['Verilog', 'VHDL', 'C', 'All of the above'],
    answer: 'All of the above',
  },
];

const Test = () => {
  const [category, setCategory] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleOptionSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleNextQuestion = () => {
    setAnswers([...answers, selectedOption]);
    setSelectedOption('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSubmit = () => {
    setAnswers([...answers, selectedOption]);
    // TODO: Send answers and category to server to store in database
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => {
      return (
        <div key={index}>
          <label>
            <input type="radio" value={option} checked={selectedOption === option} onChange={() => handleOptionSelect(option)} />
            {option}
          </label>
        </div>
      );
    });
  };

  const renderQuestion = () => {
    return (
      <div>
        <h3>Question {currentQuestion + 1}</h3>
        <p>{questions[currentQuestion].question}</p>
        {renderOptions()}
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div>
        <h3>Test Result</h3>
        <p>Category: {category}</p>
        <p>Answers:</p>
        <ul>
          {answers.map((answer, index) => {
            return <li key={index}>{answer}</li>;
          })}
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };

  return (
    <div>
      {!category ? (
        <div>
          <h2>Select a category</h2>
          <button onClick={() => handleCategorySelect('VLSI')}>VLSI</button>
          <button onClick={() => handleCategorySelect('Embedded')}>Embedded</button>
          <button onClick={() => handleCategorySelect('Software')}>Software</button>
        </div>
      ) : (
        <div>
          {isFinished ? renderResult() : renderQuestion()}
        </div>
      )}
    </div>
  );
};

export default Test;
