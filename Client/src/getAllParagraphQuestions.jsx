import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './Test/getMCQQuestions.module.css'

const AllParagraphQuestions = () => {
  const navigate = useNavigate();
  const [questions,setquestions] = useState([])
  useEffect(() => {
        axios.get("http://localhost:701/getAllParagraphQuestions")
          .then((response) => {
            setquestions(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      

  }, [questions]);

  const handleBackClick = () => {
    navigate('../getAllMCQQuestions')
  };

  return (
    <div className={styles.container}>
      <h2>Paragraph Questions</h2>
      <div className="paragraph-questions-list">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id} className="paragraph-question">
              <h2>{question.question}</h2>
              <textarea
                rows="20"
                cols="50"
                // onChange={(event) =>
                //   handleTextAreaChange(event, question._id)
                // }
                value={question.answer}
              ></textarea>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <button     
        onClick={handleBackClick}
        >Back</button>
      </div>
    </div>
  );
};

export default AllParagraphQuestions;