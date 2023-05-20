import React, { useContext, useState, useEffect } from "react";
import { Link ,useLocation} from "react-router-dom";
import { store } from "./App";
import { Navigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "./Service/helper";
const MyProfile = () => {
  const location = useLocation();
  const email = location.state?.email; // Add a conditional check for email property
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/myprofile`, {
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
    <div style={{ backgroundColor: "#F0F1F4" }}>
      {data && (
        <center>
          <br />
          <div className="card" style={{ width: "18rem",marginTop:"90px" }}>
            <div className="card-body">
            <h5 className="card-title">Welcome {email}</h5>
            <br />
              <button
                style={{ backgroundColor: "#F19E18", fontFamily: "fantasy" }}
                className="btn"
                onClick={() => setToken(null)}
              >
                Logout
              </button>
            </div>
            <div className="card-body">
            <Link to="/CandidateList"
              className="btn"
              style={{
                  marginLeft: "5px",
                  backgroundColor: "#6BD8BA",
                  fontFamily: "fantasy",
                  marginTop:"2px"
                }}
              >
              Manage Candidate
              </Link>
            </div>
            <div className="card-body">
            <Link
                to="/CandidateForm"
                className="btn"
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#01717B",
                  fontFamily: "fantasy",
                }}
              >
                Add Candidate
              </Link>
            </div>
            <div className="card-body">
            <Link
                to="/getAllMCQQuestions"
                className="btn"
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#1E5BB6",
                  fontFamily: "fantasy",
                }}
              >
                View Questions
              </Link>
            </div>
            <div className="card-body">
            <Link
                to="/AddQuestions"
                className="btn"
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#B1D7E7",
                  fontFamily: "fantasy",
                }}
              >
              Add Questions
              </Link>
            </div>
          </div>
        </center>
      )}
    </div>
  );
};
export default MyProfile;