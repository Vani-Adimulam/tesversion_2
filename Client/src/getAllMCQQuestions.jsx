import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./getAllMCQQuestions.css"

const AllMCQQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(6);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  useEffect(() => {
    axios
      .get("http://localhost:701/getMCQQuestions")
      .then((response) => {
        setQuestions(response.data);
        setFilteredQuestions(response.data);
        setAreas([...new Set(response.data.map((question) => question.area))]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleNextClick() {
    navigate("../getAllParagraphQuestions");
  }

  function handleAreaChange(event) {
    const selectedArea = event.target.value;
    setSelectedArea(selectedArea);
    setFilteredQuestions(
      selectedArea
        ? questions.filter((question) => question.area === selectedArea)
        : questions
    );
    setCurrentPage(1); // Reset to first page
  }

  return (
    <Container style={{ marginTop: "90px" }}>
  <h2 style={{ marginBottom: "30px" }}>MC Questions</h2>
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
  <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
  <Button style={{backgroundColor:"#2B4D9D"}} onClick={handleNextClick}>
    View Paragraph questions
  </Button>
</div>

  <Row>
    {currentQuestions.map((question) => (
      <Col key={question._id} lg={6} style={{ marginBottom: "30px" }}>
        <div className="card h-100 mt-3">
          <div className="card-body" style={{backgroundColor:"#BDCCDA",borderRadius:"5px"}}>
            <h5 className="card-title">{question.question}</h5>
            <Form>
              <Form.Check
                type="radio"
                id={`${question._id}-1`}
                label={<span className="choice-label">{question.choice1}</span>}
                name={question._id}
                value="1"
                checked={question.correct_choice === "1"}
              />
              <Form.Check
                type="radio"
                id={`${question._id}-2`}
                label={question.choice2}
                name={question._id}
                value="2"
                checked={question.correct_choice === "2"}
              />
              <Form.Check
                type="radio"
                id={`${question._id}-3`}
                label={question.choice3}
                name={question._id}
                value="3"
                checked={question.correct_choice === "3"}
              />
              <Form.Check
                type="radio"
                id={`${question._id}-4`}
                label={question.choice4}
                name={question._id}
                value="4"
                checked={question.correct_choice === "4"}
              />
            </Form>
          </div>
          <div className="card-footer">
            <small className="text-muted">Area: {question.area}</small>
          </div>
        </div>
      </Col>
    ))}
  </Row>
  <Pagination
    activePage={currentPage}
    itemsCountPerPage={questionsPerPage}
    totalItemsCount={filteredQuestions.length}
    pageRangeDisplayed={5}
    onChange={setCurrentPage}
    itemClass="page-item"
    linkClass="page-link"
    style={{ marginTop: "30px" }}
  />
  
</Container>

  );
};

export default AllMCQQuestions;
