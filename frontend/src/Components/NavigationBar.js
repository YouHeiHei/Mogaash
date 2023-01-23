import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <Navbar
      bg="primary"
      expand="lg"
      variant="dark"
      sticky="top"
      className="navbar"
    >
      <Container fluid style={{ paddingInline: "30px" }}>
        <Navbar.Brand href="/" style={{ fontSize: "22px" }}>
          Mogaash
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", fontSize: "16px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/user"}>
              User
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
