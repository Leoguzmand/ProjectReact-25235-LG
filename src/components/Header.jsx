import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FaCircleArrowRight, FaTruck } from "react-icons/fa";
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
          <FaCircleArrowRight size={22} className="ms-2" />
          <FaTruck size={22} className="ms-2" />
          */}
          <span className="ms-2">E-Commerce</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
