import React, { useState } from "react";
import McqForm from "./McqForm";
import AddParagraphQuestionForm from "./AddParagraphQuestionForm";
import { Form, Container, Row, Col} from "react-bootstrap";

const AddQuestions = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6">
          <Form style={{marginTop:"70px"}}>
            <Form.Group controlId="questionTypeSelect">
              <Form.Label style={{fontFamily:"revert-layer",fontWeight:"bold"}}>
               Please Select Your Question Type
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedQuestionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="">Select a question type</option>
                <option value="MCQ">MCQ</option>
                <option value="TEXT">Paragraph</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {selectedQuestionType === "TEXT" && <AddParagraphQuestionForm />}
          {selectedQuestionType === "MCQ" && <McqForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuestions;
