import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import styles from './getAllMCQQuestions.module.scss';
import { useNavigate } from 'react-router-dom';

const AllMCQQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:701/getMCQQuestions')
      .then(response => {
        setQuestions(response.data);
        setFilteredQuestions(response.data);
        setAreas([...new Set(response.data.map(question => question.area))]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleNextClick() {
    navigate('../getAllParagraphQuestions');
  }

  function handleAreaChange(event) {
    setSelectedArea(event.target.value);
    setFilteredQuestions(
      selectedArea
        ? questions.filter(question => question.area === selectedArea)
        : questions
    );
  }

  return (
    <Container style={{marginTop:"90px"}}>
      <h2>MCQ Questions</h2>
      <Form.Group as={Row}>
        <Col sm={4}>
          <Form.Control
            as="select"
            value={selectedArea}
            onChange={handleAreaChange}
          >
            <option value="">Select an area</option>
            {areas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <Row>
        <Col>
          {filteredQuestions.map(question => (
            <div key={question._id} className="mb-4">
              <h3>{question.question}</h3>
              <Form>
                <Form.Check
                  type="radio"
                  id={`${question._id}-1`}
                  label={question.choice1}
                  name={question._id}
                  value="1"
                  checked={question.correct_choice === '1'}
                />
                <Form.Check
                  type="radio"
                  id={`${question._id}-2`}
                  label={question.choice2}
                  name={question._id}
                  value="2"
                  checked={question.correct_choice === '2'}
                />
                <Form.Check
                  type="radio"
                  id={`${question._id}-3`}
                  label={question.choice3}
                  name={question._id}
                  value="3"
                  checked={question.correct_choice === '3'}
                />
                <Form.Check
                  type="radio"
                  id={`${question._id}-4`}
                  label={question.choice4}
                  name={question._id}
                  value="4"
                  checked={question.correct_choice === '4'}
                />
              </Form>
              <hr />
            </div>
          ))}
        </Col>
      </Row>
      <div>
        <Button variant="primary" onClick={handleNextClick}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AllMCQQuestions;
