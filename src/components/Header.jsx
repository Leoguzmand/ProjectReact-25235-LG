import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FaArrowCircleRight, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      className="shadow-sm border-bottom fixed-top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold text-primary"
        >
          {/*
          <FaArrowCircleRight size={22} className="ms-2" />
          <FaTruck size={22} className="ms-2" />
          */}
          <span className="ms-2">E-Commerce</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
