import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import info from "./assets/infographic-img2.png";
import info2 from "./assets/infographic-img.png";
import backgroundImage from "./assets/dark-texture-watercolor.jpg"; // Add the path to your background image

const Home = () => {
  const containerStyle = {
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    height: "100vh", // Adjust the height as needed
    color: "#ffffff", // Set text color to contrast with the background
  };

  return (
    <div style={containerStyle}>
      <Row className="justify-content-center">
        <Col md={8} className="text-center" style={{ marginTop: "100px" }}>
          <h1 className="display">Welcome to Online Assessment</h1>
          <br />
          <h5>
            Are you an individual looking to test your own knowledge? We've got
            you covered.
          </h5>
          <h5>
            Whether you're a student, a professional, or a lifelong learner,
            join us today and start your journey towards success!
          </h5>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <p className="lead">
            Driven by technology disruptions and a raging pandemic, global
            majors in the hi-tech industry are looking to scale and outcompete
            rivals by outsourcing critical pieces of development work to
            innovative design services partners. Large design services companies
            are unable to build a high-quality pool of resources with specialized
            skills due to their large overheads and previous generation financial
            models. As a result, they can only subcontract and act as a distribution
            channel for niche, specialized smaller firms such as that have built
            enduring supply chains at the right cost.
          </p>

          <p className="lead">
            Since inception,Expert teams have successfully taped out tens of
            complex SoCs in various domains and industry segments for major
            semiconductor and technology businesses worldwide. Our engineers are
            extremely comfortable working across a variety of technology nodes,
            tools and flows, design tools and techniques, and are skilled at
            handing off designs without surprises.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Image src={info} fluid style={{ marginLeft: "150px" }} />
        </Col>
        <Col md={6}>
          <Image src={info2} fluid style={{ marginRight: "100px" }} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
