import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/onlinetest_web_application-removebg-preview-removebg-preview.png"
// import logo from "./assets/p2f-semi-logo-img.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
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
    <div className="navbar navbar-expand-lg navbar-fixed fixed-top"
      style={{ justifyContent: "space-between", backgroundColor: '#ffffff', margin: '0'}}
    >
      <img src={logo} alt="logo" style={{ height: "50px", marginLeft: "15px" }} />
      <span
        style={{
          // float: "",
          fontSize: "35px",
          fontWeight: "650",
          color:"#40a3e6",
          // backgroundImage:
          //   "linear-gradient(to right, blue, orange)",
          // WebkitBackgroundClip: "text",
          // MozBackgroundClip: "text",
          // backgroundClip: "text",
          // color: "transparent",
        }}
        className="navbar-brand"
      >
       testmaster
      </span>
      <div className="d-flex">
        {showHomeLink && (
          <Link to="/" className="navbar-brand" onClick={handleHomeClick}>
            {/* <FontAwesomeIcon icon={faHouse} /> */}
            <span style={{fontFamily: 'Poppins, sans-serif'}}>Home</span>
          </Link>
        )}
        {!isLoggedIn && showHomeLink && (
          <Link
            to="/Login"
            className="navbar-brand"
            onClick={handleLogInClick}
          >
            {/* <FontAwesomeIcon icon={faRightToBracket} /> */}
            <span  style={{fontFamily: 'Poppins, sans-serif'}}>Login</span>
          </Link>
        )}
        {isLoggedIn && showHomeLink }
      </div>
    </div>
  );
};
export default Nav;