import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Summary = () => {
    const location = useLocation();
    const { email, mcqScore, textScore, codeScore, totalScore, total } = location.state;
    const [result, setResult] = useState('')
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();

    async function updateCandidateResult(result, email) {
        try {
          const response = await fetch(`http://localhost:701/updateTestResult/${email.email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ result, mcqScore, codeScore, textScore, totalScore })
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || 'Failed to update candidate result.');
          }
      
          return data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    

    return (
        <div>

            <h1 style={{ marginTop: "130px" }}>Candiate Results </h1>
            <br />
            <p>MCQ Marks: {mcqScore}</p>
            <p>Paragraph Marks: {textScore}</p>
            <p>Code Marks: {codeScore}</p>
            <p>Marks obtained: {totalScore}</p>
            <p>Total Marks of test : {total}</p>
            <br />
            <hr />

            {/* Add two buttons 'Pass' & 'Fail'. Update a state variable result based on the click  */}
            

            <button onClick={() => {
                setResult('Pass');
                updateCandidateResult('Pass', { email });
                setIsButtonClicked(true);
                navigate('/CandidateList')
                window.location.reload()
            }} disabled={isButtonClicked}>
                Pass
            </button>

            <button onClick={() => {
                setResult('Fail');
                updateCandidateResult('Fail', { email });
                setIsButtonClicked(true);
                navigate('/CandidateList')
                window.location.reload()
            }} disabled={isButtonClicked}>
                Fail
            </button>
            <br />
            <br />
            <p>Result is {result}</p>
        </div>

    )
}

export default Summary;