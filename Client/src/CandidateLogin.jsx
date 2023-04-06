import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification=()=> {
  const [email, setEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate();

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // make a request to the backend to verify the email
      const response = await axios.post('http://localhost:701/verify-email', { email });
      setVerificationStatus(response.data.status);
      // navigate to the "Instructions" component on successful verification
      if (response.data.status === 'Email verified') {
        navigate('/instructions');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Verify Your Email</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
              {verificationStatus && <p className="mt-3 text-center">{verificationStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
