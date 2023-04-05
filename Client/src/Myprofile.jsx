import React, { useContext, useState, useEffect } from "react";
// import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import { store } from "./App";
import { Navigate } from "react-router";
import axios from "axios";

const MyProfile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);


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

  return (
    <div>
      {data && (
        <center>
          <br />
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Welcome : {data.email}</h5>
              <button
                className="btn btn-primary"
                onClick={() => setToken(null)}>
                Logout
              </button>
              <Link to="/CandidateForm" className="btn btn-primary" style={{marginLeft:"5px"}}>
      Add Candidate
    </Link>
             
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default MyProfile;