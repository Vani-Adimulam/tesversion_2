import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { BASE_URL } from "./Service/helper";

const Summary = () => {
  const location = useLocation();
  const {
    email,
    mcqScore,
    textScore,
    codeScore,
    totalScore,
    total,
  } = location.state;
  const [result, setResult] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();

  async function updateCandidateResult(result, email) {
    try {
      const response = await fetch(
        `${BASE_URL}/updateTestResult/${email.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result,
            mcqScore,
            codeScore,
            textScore,
            totalScore,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update candidate result.");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <Container>
      <h1 style={{ marginTop: "130px" }}>Candidate Results</h1>
      <br />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>MCQ Marks</Card.Title>
              <Card.Text>{mcqScore}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Paragraph Marks</Card.Title>
              <Card.Text>{textScore}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Code Marks</Card.Title>
              <Card.Text>{codeScore}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Marks Obtained</Card.Title>
              <Card.Text>{totalScore}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Marks of Test</Card.Title>
              <Card.Text>{total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <hr />

      {/* Add two buttons 'Pass' & 'Fail'. Update a state variable result based on the click  */}

      <Button
        variant="success"
        style={{marginRight:"10px"}}
        onClick={() => {
          setResult("Pass");
          updateCandidateResult("Pass", { email });
          setIsButtonClicked(true);
          navigate("/CandidateList");
          window.location.reload();
        }}
        disabled={isButtonClicked}
      >
        Pass
      </Button>

      <Button
        variant="danger"
        onClick={() => {
          setResult("Fail");
          updateCandidateResult("Fail", { email });
          setIsButtonClicked(true);
          navigate("/CandidateList");
          window.location.reload();
        }}
        disabled={isButtonClicked}
      >
        Fail
      </Button>
      <br />
      <p>{result}</p>
    </Container>
  );
};

export default Summary;
