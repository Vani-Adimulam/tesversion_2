import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './getMCQQuestions.module.css';

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

  useEffect(() => {
    if (!hasFetchedP) {
        axios.get("http://localhost:701/getParagraphQuestionsforTest")
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
    const email = JSON.parse(localStorage.getItem("email"));
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
    <div className={styles.container}>
      <h2>Paragraph Questions</h2>
      <div className="paragraph-questions-list">
        {paragraphquestions.length > 0 ? (
          paragraphquestions.map((question) => (
            <div key={question._id} className="paragraph-question">
              <h2>{question.question}</h2>
              <textarea
                rows="20"
                cols="50"
                value={providedAnswers[question._id]}
                onChange={(event) =>
                  handleTextAreaChange(event, question._id)
                }
              ></textarea>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={handleSubmitClick}>Submit</button>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default ParagraphQuestions;