import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import trashIcon from "./assets/trash.svg"
import pen from "./assets/pen.svg"
import assessment from "./assets/assessment.png"
// import evalIcon from "./assets/checked.svg"

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editCandidate, setEditCandidate] = useState({});
  const [deleteCandidate, setDeleteCandidate] = useState({});
  const [searchText, setSearchText] = useState("");
  const [testStatus,setTestStatus]=useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:701/all");
      setCandidates(result.data);
      setTestStatus(result.data.testStatus)
    };
    fetchData();
  }, []);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = (candidate) => {
    setEditCandidate(candidate);
    setShowEditModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = (candidate) => {
    setDeleteCandidate(candidate);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:701/edit/${editCandidate._id}`, {
        email: editCandidate.email,
      });
      const index = candidates.findIndex(
        (candidate) => candidate._id === editCandidate._id
      );
      const updatedCandidates = [...candidates];
      updatedCandidates[index].email = editCandidate.email;
      setCandidates(updatedCandidates);
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
      console.log(testStatus)
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await axios.delete(`http://localhost:701/delete/${deleteCandidate._id}`);
      const index = candidates.findIndex(
        (candidate) => candidate._id === deleteCandidate._id
      );
      const updatedCandidates = [...candidates];
      updatedCandidates.splice(index, 1);
      setCandidates(updatedCandidates);
      setShowDeleteModal(false);
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
    const state = { email: candidate.email };
    navigate('/EvalQuestions',{ state })
  }

  return (
    <>
    <center>

      <h1>Candidates</h1>
      <FormControl
        type="text"
        placeholder="Search by email"
        value={searchText}
        onChange={handleSearch}
        style={{ width: "40rem"}}
      />
      <div style={{ display: "flex", justifyContent: "center",width: "40rem",marginTop:"5px"}}>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Email</th>
            <th>Test Status</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Evaluate</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.email}</td>
              <td>{candidate.testStatus}</td>
              <td>
                <Button
                
                  style={{ backgroundColor: "#56C2AC",borderColor:"#dee2e6" }}
                  onClick={() => handleEditModalShow(candidate)}
                  >
                  <img src={pen} alt="edit" />
                </Button>
              </td>
              <td>
                <Button
                 style={{ backgroundColor: "#DA3B44",borderColor:"#dee2e6"}}
                className="btn"
                  onClick={() => handleDeleteModalShow(candidate)}>
                  <img src={trashIcon} alt="Delete" />
                </Button>
              </td>
              <td>
                <Button
                 style={{backgroundColor:"#fff",borderColor:"#dee2e6"}}
                onClick={() => handleEvaluateModalShow(candidate)}>
                   <img src={assessment} alt="assessment" style={{width:"20px",height:"20px"}}/>
                </Button>
              </td>
              <td>{candidate.result}</td>
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
        value={editCandidate.Teststatus}
        onChange={(event) =>{
          setEditCandidate({
            ...editCandidate,
            Teststatus: event.target.value,
          }
          )
        }
        }
        
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="cancelled">cancelled</option>
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
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the candidate with email{" "}
          <strong>{deleteCandidate.email}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CandidateList;
