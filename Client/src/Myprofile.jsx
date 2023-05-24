import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { store } from "./App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./Service/helper";

const MyProfile = () => {
  const location = useLocation();
  const email = location.state?.email; // Add a conditional check for email property
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios
        .get(`${BASE_URL}/myprofile`, {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      localStorage.removeItem("token");
      setIsLoading(false);
    }
  }, [token]);
const navigate = useNavigate()
  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while token is retrieved
  }

  return (
    <div style={{ backgroundColor: "#F0F1F4" }}>
    {data && (
      <center>
        <br />
        <div className="card" style={{ width: "18rem", marginTop: "90px" }}>
          <div className="card-body">
            <h5 className="card-title">Welcome {email}</h5>
            <br />
            <button
              style={{ backgroundColor: "#F19E18", fontFamily: "fantasy" }}
              className="btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
            <div className="card-body">
              <Link
                to="/CandidateList"
                className="btn"
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#6BD8BA",
                  fontFamily: "fantasy",
                  marginTop: "2px",
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
