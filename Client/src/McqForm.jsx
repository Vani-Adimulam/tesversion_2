import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const McqForm = ({ handleAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mcqQuestion = {
      type: "MCQ",
      question: question,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer: correctAnswer,
    };
    handleAddQuestion(mcqQuestion);
  };

  return (
    <div className="card">
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="questionText">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="optionA">
            <Form.Label>Option A</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="optionB">
            <Form.Label>Option B</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="optionC">
            <Form.Label>Option C</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="optionD">
            <Form.Label>Option D</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="correctAnswer">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter correct answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Question
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default McqForm;
