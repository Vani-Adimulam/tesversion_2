import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";

// import styles from './getMCQQuestions.module.css';

const ParagraphQuestions = () => {
  const navigate = useNavigate();
  const [paragraphquestions, setParagraphQuestions] = useState(JSON.parse(localStorage.getItem('paragraphquestions'))||[])
  const [selectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [providedAnswers, setProvidedAnswers] = useState(
    JSON.parse(localStorage.getItem("providedAnswers")) || {}
  );
  const [hasFetchedP, setHasFetchedP] = useState(localStorage.getItem('hasFetchedP')||false);
  const email = JSON.parse(localStorage.getItem("email"));
  
  useEffect(() => {
    if (!hasFetchedP) {
        axios.get(`http://localhost:701/getParagraphQuestionsforTest/${email}`)
          .then((response) => {
            localStorage.setItem('paragraphquestions',
            JSON.stringify(response.data.questions));
            setParagraphQuestions(response.data.questions);
            setHasFetchedP(true);
            localStorage.setItem('hasFetchedP',true)
          })
          .catch((error) => {
            console.log(error);
          });
      
    }
  }, [hasFetchedP]);

  const handleTextAreaChange = (event, questionId) => {
    const providedAnswer = event.target.value;
    setProvidedAnswers({
      ...providedAnswers,
      [questionId]: providedAnswer,
    });
    localStorage.setItem(
      "providedAnswers",
      JSON.stringify({
        ...providedAnswers,
        [questionId]: providedAnswer,
      })
    );
  };



  const handleSubmitClick = () => {
    // make a post request to /testresults and define a request body with email from localStorage and selectedAnswers and providedAnswers
    const selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers"));
    const providedAnswers = JSON.parse(localStorage.getItem("providedAnswers"))
    const requestBody = {
        email,
        selectedAnswers,
        providedAnswers,
        };
        axios.post("http://localhost:701/testresults", requestBody) 
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        // create a sample patch request using axios
    const requestBody2 = {
      email,
      testStatus: "Test Taken",
    }
    axios.patch("http://localhost:701/updateCandidateTeststatus", requestBody2)
    .then((response) => {
      console.log(response);
      })
      .catch((error) => {
        console.log(error);
        })
    localStorage.clear();
    // Update the candidate collection and set "test status" as "Completed"
    navigate("../Results")
  };
  const handleBackClick = () => {
    navigate("../getMCQQuestions", {
      state: { selectedAnswers, providedAnswers },
    });
  };

  return (
    <center>
    <div>
  <p style={{ marginTop: "90px"}} className='display-4'> Technical and Theory</p>
  <div className="paragraph-questions-list">
    {paragraphquestions.length > 0 ? (
      paragraphquestions.map((question) => (
       
        <Card key={question._id} className="mb-3" style={{border:"1px solid gray",width:"800px"}}>
          <Card.Header>{question.question}</Card.Header>
          <Card.Body>
            <textarea
              rows="10"
              cols="50"
              value={providedAnswers[question._id]}
              onChange={(event) =>
                handleTextAreaChange(event, question._id)
              }
              style={{ width: "100%", border: "none", outline:"none"}}
            ></textarea>
          </Card.Body>
        </Card>
      
      ))
    ) : (
      <p>Loading...</p>
    )}
    <Button onClick={handleSubmitClick} style={{ marginRight: "5px", marginLeft: "10px",marginTop:"-10px" }}>Submit</Button>
    <Button variant="secondary" onClick={handleBackClick}
    style={{marginTop:"-10px"}}>Back</Button>
  </div>
</div>
  </center>

  );
};

export default ParagraphQuestions;