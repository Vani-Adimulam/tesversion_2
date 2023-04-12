import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from './App';
import axios from 'axios';

const CandidateLogin = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: ""
  });

//errormessage handling
  const [errorMessage, setErrorMessage] = useState("");

//email changehandler
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
//verifying the email and generate the token
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:701/verify-email", data)
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token)          
        } else {
          console.log("Email is not valid");
          setErrorMessage("Email  not registered");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Email not registered");
      });
  }; 
  
//navigation to the instructions page
  const navigate = useNavigate();
  if (token) {
    navigate("/instructions");
  }

  return (
    
      <div className="card">
      <div className="card-body">
        <h5 className="card-title">Email Form</h5>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={data.email}
              onChange={changeHandler}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {errorMessage && (
            <div className="mt-3 text-center text-danger">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CandidateLogin;
