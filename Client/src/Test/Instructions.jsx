import React,{useState,useContext,useEffect}from 'react';

import { store } from '../App';
import { Navigate, useNavigate } from "react-router";
import axios from 'axios';

const Instructions = () => {


  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:701/instructions", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  if (!token) {
    return <Navigate to="/verify-emails"/>;
  }

  const handleStart = () =>{
    navigate("/MCQTest");
  }
  
  return (
    <div>
    {data && (
        <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2>Test Instructions</h2>
        <ul className="list-unstyled">
          <li className="mb-4">
            <b>Use a reliable internet connection:</b> Make sure you have a reliable internet connection and that your device is charged or plugged in.
          </li>
          <li className="mb-4">
            <b>Use a quiet environment:</b> Choose a quiet place to take the test where you won't be disturbed.
          </li>
          <li className="mb-4">
           <b>Use an appropriate device:</b>Use a desktop or laptop computer with a large screen if possible. Mobile devices or tablets may not be suitable for all types of tests.
          </li>
          <li className="mb-4">
            <b>Keep track of time:</b> Make sure to keep track of time and pace yourself throughout the test.
          </li>
          <li className="mb-4">
            <b>Answer all questions:</b> Try to answer all questions to the best of your ability. If you are unsure of an answer, make your best guess.
          </li>
          <li className="mb-4">
            <b>Don't cheat:</b> Do not cheat or attempt to cheat in any way. This is a test of your abilities and cheating will only hurt your results.
          </li>
          <li className="mb-4">
            <b>Contact support if needed:</b> If you encounter any technical difficulties or have questions during the test, contact the support team for assistance.
          </li>
        </ul>
        <button className="btn btn-primary" onClick={handleStart}>Start</button>
        <button
                style={{ backgroundColor: "#FD7800", fontFamily: "fantasy",marginLeft:"3px"}}
                className="btn"
                onClick={() => {
                  setToken(null)
                  localStorage.clear()
                  window.location.reload()
                }}
              >
                Logout
              </button>
        {/* give me a drop down with items 'VLSI', 'Embedded' and 'Software' in html and css*/}

      </div>
    </div>
    )}
    </div>

  );
};

export default Instructions;
