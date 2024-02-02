import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/onlinetest_web_application-removebg-preview-removebg-preview.png";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [showHomeLink, setShowHomeLink] = useState(
    JSON.parse(localStorage.getItem("showHomeLink")) || true
  );

  const handleLogInClick = () => {
    setIsLoggedIn(true);
    setShowHomeLink(false);
  };

  const handleHomeClick = () => {
    setShowHomeLink(true);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("showHomeLink", JSON.stringify(showHomeLink));
  }, [isLoggedIn, showHomeLink]);

  return (
    <div
      className="navbar navbar-expand-lg navbar-fixed fixed-top"
      style={{
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        margin: "0",
        alignItems: "center", // Align items in the center vertically
      }}
    >
      <div className="d-flex align-items-center">
        <img
          src={logo}
          alt="logo"
          style={{ height: "55px", marginLeft: "10px" }}
        />
        <span
          style={{
            fontSize: "30px",
            fontWeight: "550",
            color: "#40a3e6",
            fontFamily: "Poppins, sans-serif",
          }}
          className="navbar-brand"
        >
          testmaster
        </span>
      </div>
      <div className="d-flex">
        {showHomeLink && (
          <Link to="/" className="navbar-brand" onClick={handleHomeClick}>
            <span style={{ fontFamily: "Poppins, sans-serif" }}>Home</span>
          </Link>
        )}
        {!isLoggedIn && showHomeLink && (
          <Link
            to="/Login"
            className="navbar-brand"
            onClick={handleLogInClick}
          >
            <span style={{ fontFamily: "Poppins, sans-serif" }}>Login</span>
          </Link>
        )}
        {isLoggedIn && showHomeLink}
      </div>
    </div>
  );
};

export default Nav;
