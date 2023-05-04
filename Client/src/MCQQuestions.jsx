import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal, Button, Card, Form } from 'react-bootstrap';

const MCQTest = () => {
  const [areaIndex, setAreaIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAreaChange = (event) => {
    setAreaIndex(event.target.value);
  };

  const handleButtonClick = async () => {
    if (areaIndex !== 0) {
      setShowModal(true);
    } else {
      localStorage.setItem('areaIndex', areaIndex);
      navigate('/getMCQQuestions');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmModal = () => {
    localStorage.setItem('areaIndex', areaIndex);
    navigate('/getMCQQuestions');
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{width:"500px",marginTop:"100px"}}>
        <Card.Body>
          <Form>
            <Form.Group controlId="formArea">
              <Form.Label>Select an area:</Form.Label>
              <Form.Control as="select" value={areaIndex} onChange={handleAreaChange}>
                <option value={0}>VLSI</option>
                <option value={1}>SOFTWARE</option>
                <option value={2}>EMBEDDED</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleButtonClick} className="mt-3">
            Start Test
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You cannot change the category once selecting it. Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmModal}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MCQTest;
