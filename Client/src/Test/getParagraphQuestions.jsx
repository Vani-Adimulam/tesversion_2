import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ParagraphQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:701/getParagraphQuestionsforTest")
        .then(response => {
            setQuestions(response.data.questions);
            console.log(response.data.questions);
            })
        .catch(error => {
            console.log(error);
            });
            }, []);
    
    function handleNextClick() {
        navigate('../getParagraphQuestions')
    }
    
    function handleBackClick() {
        navigate('../getMCQQuestions')
    }
    return(
    <div className="paragraph-questions-container">
            <h2>Paragraph Questions</h2>
            <div className="paragraph-questions-list">
                {questions.map(question => (
                    <div key={question._id} className="paragraph-question">
                        <h2>{question.question}</h2>
                        <textarea name="provided-answer" id="" cols="50" rows="20"></textarea>
                        <br />
                        <hr />
                    </div>
                ))}
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleBackClick}>Back</button>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleNextClick}>Next</button>
            </div>
            <p>Submit button coming</p>
        </div>
    ) 
        
}

export default ParagraphQuestions;
