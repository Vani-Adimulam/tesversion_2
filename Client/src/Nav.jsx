import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/p2f-semi-logo-img.png";

const Nav = () => {
  return (
    // <div className="container">
    <div
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ justifyContent: "space-between" }}
    >
      <img src={logo} alt="" style={{ height: "40px", marginLeft: "15px" }} />
      <span
        style={{
          float: "left",
          fontSize: "40px",
          fontWeight: "650",
          backgroundImage:
            "linear-gradient(90deg, rgba(79,199,44,1) 8%, rgba(234,231,15,1) 24%, rgba(255,0,22,1) 49%)",
          WebkitBackgroundClip: "text",
          MozBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          marginLeft:"100px"
        }}
        className="navbar-brand"
      >
        P2F Online Assessment
      </span>
      <div className="d-flex">
      <Link to="/" className="navbar-brand"><h3>Home</h3></Link>
        <Link to="/login" className="navbar-brand mr-3"><h3>Evaluator</h3></Link>
        <Link to="/verify-emails" className="navbar-brand"><h3>Candidate</h3></Link>
      </div>
    </div>
    // </div>
  );
};

export default Nav;
