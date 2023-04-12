import React, { useState, useEffect } from "react";
import axios from "axios";

const ParagraphQuestions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/getParagraphQuestionsforTest")
        .then(response => {
            setQuestions(response.data);
            console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                });
            }, []);

    return (
        <div className="paragraph-questions-container">
            <h3>Paragraph Questions</h3>
            <div className="paragraph-questions-list">
                {questions.map(question => (
                    <div key={question._id} className="paragraph-question">
                        <h4>{question.question}</h4>
                        <input type="text" name={question._id} id="answer" />
                        <br/>
                        <hr/>
                    </div>
                ))}
                
            </div>
        </div>
    )    



}

export default ParagraphQuestions;
