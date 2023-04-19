import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Results = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const buttonHandler = () =>{
    navigate('/')
    window.location.reload();
  }

  return (
    <div>
        <h1>Congratulations for submitting the test!</h1>
        <p>You have successfully submitted the test. Your results will be shared with you!</p>
        <br/>
        <button onClick={buttonHandler}>Click here to finish</button>
    </div>
  );
};

export default Results;

