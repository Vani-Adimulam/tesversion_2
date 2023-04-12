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
    <div>
        <form onSubmit={submitHandler}>
          <label>
            Email:
            <input
              type="email"
              name='email'
              id='email'
              onChange={changeHandler}
            />
          </label>
          <button type="submit">Submit</button>
          {errorMessage && (
                  <div className="mt-3 text-center text-danger">
                    {errorMessage}
                  </div>
                )}
        </form>
    </div>
  );
}

export default CandidateLogin;
