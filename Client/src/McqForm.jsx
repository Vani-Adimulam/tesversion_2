import { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./McqForm.css";
import { BASE_URL } from "./Service/helper";


const AddQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [correct_choice, setCorrectChoice] = useState("");
  const [area, setArea] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !area ||
      !question ||
      !choice1 ||
      !choice2 ||
      !choice3 ||
      !choice4 ||
      !correct_choice
    ) {
      alert("please enter all the fields");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/addQuestionMCQ`, {
        area,
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        correct_choice,
      });
      console.log(response.data);
      setArea("");
      setQuestion("");
      setChoice1("");
      setChoice2("");
      setChoice3("");
      setChoice4("");
      setCorrectChoice("");
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

 

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "60rem",marginTop:"10px" }}>
        <Card.Header style={{ fontWeight: "bold", fontFamily: "sans-serif"}}>
          Add Question
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="area">
              <Form.Label style={{ fontFamily: "sans-serif" }}>
                <h3>Area</h3>
              </Form.Label>
              <Form.Select
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Select an area</option>
                <option value="VLSI">VLSI</option>
                <option value="EMBEDDED">EMBEDDED</option>
                <option value="SOFTWARE">SOFTWARE</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="question">
              <Form.Label>
                <h4>Question</h4>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength="100"
              />
            </Form.Group>
            <Form.Group controlId="choice1">
              <Form.Label>
                <h5>Choice 1</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter choice 1"
                value={choice1}
                onChange={(e) => setChoice1(e.target.value)}
                maxLength="20"
              />
            </Form.Group>
            <Form.Group controlId="choice2">
            
              <Form.Label>
                <h5>Choice 2</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter choice 2"
                value={choice2}
                onChange={(e) => setChoice2(e.target.value)}
                maxLength="20"
              />
            </Form.Group>
            <Form.Group controlId="choice3">
              <Form.Label>
                <h5>Choice 3</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter choice 3"
                value={choice3}
                onChange={(e) => setChoice3(e.target.value)}
                maxLength="20"
              />
            </Form.Group>
            <Form.Group controlId="choice4">
              <Form.Label>
                <h5>Choice 4</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter choice 4"
                value={choice4}
                onChange={(e) => setChoice4(e.target.value)}
                maxLength="20"
              />
            </Form.Group>
            <Form.Group controlId="correct_choice">
              <Form.Label>
                <h5>Correct Choice</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the number of the correct choice (1-4)"
                value={correct_choice}
                onChange={(e) => setCorrectChoice(e.target.value)}
                maxLength="1"
              />
            </Form.Group>

            <button
              type="submit"
              className="button"
              style={{ marginTop: "10px" }}
            >
              <span className="button__text">Add</span>
              <span className="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </Form>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Question added successfully!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your question has been added to the database. Thank you for your
              contribution!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddQuestionForm;
