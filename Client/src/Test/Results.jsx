import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {Modal} from "react-bootstrap";

Modal.setAppElement("#root");

const Results = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const buttonHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    navigate("/");
    window.location.reload();
    localStorage.clear();
    setModalIsOpen(false);
  };

  return (
    <center>
      <div style={{ marginTop: "90px" }}>
        <p className="display-6">
          "Thank you for taking the test!
          click the button to send your answers for grading. Good luck!"
        </p>
        <br />
        <button
          className="btn"
          onClick={buttonHandler}
          style={{ width: "170px", backgroundColor: "#6BD8BA" }}
        >
          Click here to finish
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModalHandler}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "500px",
              width: "100%",
              padding: "30px",
            },
          }}
        >
          <h2>Test Submission</h2>
          <p>
            Your test is submitted! Shortly, you will receive a mail regarding
            your results and further process.
          </p>
          <button onClick={closeModalHandler}>Close</button>
        </Modal>
      </div>
    </center>
  );
};

export default Results;
