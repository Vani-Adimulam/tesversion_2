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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
}

export default EmailVerification;
