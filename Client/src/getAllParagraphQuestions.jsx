import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Pagination from "react-js-pagination";

const AllParagraphQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;
  const pagesVisited = (pageNumber - 1) * questionsPerPage;

  useEffect(() => {
    axios
      .get("http://localhost:701/getParagraphQuestions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBackClick = () => {
    navigate("../getAllMCQQuestions");
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setPageNumber(1); // reset page number to 1 when area is changed
  };

  const filteredQuestions = selectedArea
    ? questions.filter((question) => question.area === selectedArea)
    : questions;

  const displayQuestions = filteredQuestions
    .slice(pagesVisited, pagesVisited + questionsPerPage)
    .map((question) => (
      <Col key={question._id} xs={12} sm={6} lg={4} className="mb-4">
        <Card>
          <Card.Header>{question.question}</Card.Header>
          <Card.Body
            style={{ backgroundColor: "#BDCCDA", borderRadius: "1px" }}
          >
            <Card.Text>{question.answer}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));

  const pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    setPageNumber(pageNumber);
  }

  return (
    <Container className="mt-5">
      <h2 style={{ marginTop: "90px" }}>Theory and Technical Questions</h2>
      <Form className="mt-4 mb-4">
        <Form.Group controlId="areaSelect">
          <Form.Label>Select an area:</Form.Label>
          <Form.Control
            as="select"
            value={selectedArea}
            onChange={handleAreaChange}
          >
            <option value="">All</option>
            <option value="VLSI">VLSI</option>
            <option value="SOFTWARE">SOFTWARE</option>
            <option value="EMBEDDED">EMBEDDED</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row>
        {displayQuestions.length > 0 ? (
          displayQuestions
        ) : (
          <p>No questions found.</p>
        )}
      </Row>
      {pageCount > 1 && (
        <div className="pagination-container">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={questionsPerPage}
            totalItemsCount={filteredQuestions.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            style={{ marginTop: "30px" }}
          />
        </div>
      )}
      <button
        className="btn"
        style={{ backgroundColor: "#BEBFC0", marginTop: "-15px" }}
        onClick={handleBackClick}
      >
        Back
      </button>
    </Container>
  );
};

export default AllParagraphQuestions;
