import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { store } from "./App";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';
import McqForm from './McqForm';

const MyProfile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [showMcqForm, setShowMcqForm] = useState(false);


  //ADD QUESTION
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:701/myprofile", {
      headers: {
        "x-token": token,
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleAddQuestion = () => {
    setShowMcqForm(true);
  };

  function handleViewQuestions() {
    navigate('./getAllMCQQuestions')
  }

  return (
    <div>
      {data && (
        <center>
          <br />
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Welcome Evaluator</h5>
              <button
                className="btn btn-primary"
                onClick={() => setToken(null)}>
                Logout
              </button>
              <Link to="/CandidateForm" className="btn btn-primary" style={{ marginLeft: "5px" }}>
                Add Candidate
              </Link>
            </div>
          </div>
          <Button variant="primary" onClick={() => setShowDropdown(!showDropdown)}>Add Question</Button>
          {showDropdown && (
            <DropdownButton id="dropdown-basic-button" title="Select a Category" style={{ marginTop: "" }}>
              <Dropdown.Item onClick={() => handleCategorySelect('VLSI')}>VLSI</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect('Embedded')}>Embedded</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect('Software')}>Software</Dropdown.Item>
            </DropdownButton>
          )}
          {selectedCategory && (
            <div>
              <h2>Add a question for {selectedCategory} category:</h2>
              <Form>
                <Form.Group controlId="questionTypeSelect">
                  <Form.Label>Select Question Type</Form.Label>
                  <Form.Control as="select">
                    <option>MCQ</option>
                    <option>TEXT</option>
                    <option>CODING</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleAddQuestion}>Add Question</Button>
              </Form>
            </div>
          )}
          {showMcqForm && (
            <McqForm category={selectedCategory} setShowMcqForm={setShowMcqForm} handleAddQuestion={handleAddQuestion} />
          )}
        </center>
      )}
     <Button onClick={handleViewQuestions}>View Questions</Button>
    </div>
  );
};

export default MyProfile;