import React, { useState } from 'react';

const Dashboard = ({ onSelection }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelection = (option) => {
    setSelectedOption(option);
    onSelection(option);
  }

  return (
    <div>
      <h2>Select your option:</h2>
      <div className="d-flex flex-column">
        <button className="btn btn-primary mb-2" onClick={() => handleSelection('VLSI')}>VLSI</button>
        <button className="btn btn-primary mb-2" onClick={() => handleSelection('Embedded')}>Embedded</button>
        <button className="btn btn-primary mb-2" onClick={() => handleSelection('Software')}>Software</button>
      </div>
    </div>
  );
}

export default Dashboard;
