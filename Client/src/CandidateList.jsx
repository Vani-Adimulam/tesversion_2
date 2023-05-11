import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import pen from "./assets/pen.svg";
import assessment from "./assets/assessment.png";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCandidate, setEditCandidate] = useState({});
  const [searchText, setSearchText] = useState("");
  const [testStatus, setTestStatus] = useState("");
  let total = 0;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:701/all");
      const candidates = result.data;
      setTestStatus(candidates.testStatus);
      const updatedCandidates = await Promise.all(candidates.map(async (candidate) => {
        try {
          const res = await axios.get(`http://localhost:701/getTestResults/${candidate.email}`);
          if (res.data[0].totalScore) { // Check if totalScore exists
            total = candidate.mcqCount*1 + candidate.codeCount*5 + candidate.paragraphCount*5;
            return { ...candidate, totalScore: res.data[0].totalScore, total: total };
          } else {
            return candidate;
          }
        } catch (error) {
          console.log(error);
          return candidate;
        }
      }));
      setCandidates(updatedCandidates);
      console.log(updatedCandidates);
    };
    fetchData();
  }, []);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = (candidate) => {
    setEditCandidate(candidate);
    setShowEditModal(true);
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:701/edit/${editCandidate._id}`, {
        email: editCandidate.email,
        testStatus: editCandidate.testStatus,
      });
      const index = candidates.findIndex(
        (candidate) => candidate._id === editCandidate._id
      );
      const updatedCandidates = [...candidates];
      updatedCandidates[index].email = editCandidate.email;
      updatedCandidates[index].testStatus = testStatus;
      setCandidates(updatedCandidates);
      setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEvaluateModalShow = (candidate) => {
    const state = { email: candidate.email, testStatus : candidate.testStatus};
    navigate("/EvalQuestions", { state });
  };

  return (
    <>
      <center>
        <h1 style={{ marginTop: "100px" }}>Candidates</h1>
        <FormControl
          type="text"
          placeholder="Search by email"
          value={searchText}
          onChange={handleSearch}
          style={{ width: "40rem" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "40rem",
            marginTop: "5px",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Test Status</th>
                <th>Edit</th>
                <th>Evaluate</th>
                <th>Result</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>{candidate.email}</td>
                  <td>{candidate.testStatus}</td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "#56C2AC",
                        borderColor: "#dee2e6",
                      }}
                      onClick={() => handleEditModalShow(candidate)}
                    >
                      <img src={pen} alt="edit" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#dee2e6",
                      }}
                      onClick={() => handleEvaluateModalShow(candidate)}
                    >
                      <img
                        src={assessment}
                        alt="assessment"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Button>
                  </td>
                  <td>{candidate.result}</td>
                  <td>{candidate.totalScore} / {candidate.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </center>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editCandidate.email}
                onChange={(event) =>
                  setEditCandidate({
                    ...editCandidate,
                    email: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Test Status</Form.Label>
              <Form.Control
              as="select"
                value={editCandidate.testStatus}
                onChange={(event) => {
                  setEditCandidate({
                    ...editCandidate,
                    testStatus: event.target.value,
                  });
                }}
              >
              <option value="">Select status</option>
                 <option value="Test Cancelled">Cancel Test</option>
                 <option value="Test Not Taken">Test Not Taken</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CandidateList;
