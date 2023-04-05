import React, { useState } from 'react';

const EvalQuestions = ({ question, onNext, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  }

  const evaluateAnswer = () => {
    // Call an API to evaluate the answer and set the result state accordingly
    // Example API call using fetch:
    fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: question.id, answer }),
    })
    .then(response => response.json())
    .then(data => setResult(data.result))
    .catch(error => console.error(error));
  }

  const handleNext = () => {
    onNext();
    setAnswer('');
    setResult(null);
  }

  const handleSubmit = () => {
    onSubmit();
    setAnswer('');
    setResult(null);
  }

  return (
    <div>
      <h3>{question.text}</h3>
      {question.type === 'coding' && (
        <div>
          <textarea value={answer} onChange={handleAnswerChange} />
          <button className="btn btn-primary mt-2" onClick={evaluateAnswer}>Evaluate</button>
        </div>
      )}
      {result !== null && (
        <div>
          <p>{`Result: ${result}`}</p>
        </div>
      )}
      <button className="btn btn-primary mt-2" onClick={handleNext}>Next</button>
      <button className="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EvalQuestions;
