import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const MCQTest = () => {
  const [areaIndex, setAreaIndex] = useState(0);
  const navigate = useNavigate();

  const handleAreaChange = (event) => {
    setAreaIndex(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      console.log(areaIndex);
    } catch (error) {
      console.error(error);
    }
    localStorage.setItem('areaIndex',areaIndex);
    navigate('/getMCQQuestions')
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
      <div>
        <p>Currently fetching less than two questions for paragraph. </p>
        <p>Please add more paragraph questions to increase the number of paragraph questions for test</p>
      </div>
    </div>
  );
};

export default MCQTest;
