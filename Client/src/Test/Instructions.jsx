import React from 'react';
import { useNavigate } from 'react-router-dom';


const Instructions = () => {
  const navigate = useNavigate();

  function handleStartClick() {
    navigate('../getMCQQuestions')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2>Test Instructions</h2>
        <ul className="list-unstyled">
          <li className="mb-4">
            Use a reliable internet connection: Make sure you have a reliable internet connection and that your device is charged or plugged in.
          </li>
          <li className="mb-4">
            Use a quiet environment: Choose a quiet place to take the test where you won't be disturbed.
          </li>
          <li className="mb-4">
            Use an appropriate device: Use a desktop or laptop computer with a large screen if possible. Mobile devices or tablets may not be suitable for all types of tests.
          </li>
          <li className="mb-4">
            Keep track of time: Make sure to keep track of time and pace yourself throughout the test.
          </li>
          <li className="mb-4">
            Answer all questions: Try to answer all questions to the best of your ability. If you are unsure of an answer, make your best guess.
          </li>
          <li className="mb-4">
            Don't cheat: Do not cheat or attempt to cheat in any way. This is a test of your abilities and cheating will only hurt your results.
          </li>
          <li className="mb-4">
            Contact support if needed: If you encounter any technical difficulties or have questions during the test, contact the support team for assistance.
          </li>
        </ul>
        <button className="btn btn-primary" onClick={handleStartClick}>Start</button>
      </div>
    </div>
  );
};

export default Instructions;
