import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FaArrowCircleRight, FaShoppingCart, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      className="shadow-sm border-bottom bg-light"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold text-primary"
        >
          <FaTruck size={22} className="ms-2" />
          <FaArrowCircleRight size={22} className="ms-2" />

          <span className="ms-2">TiendaLeo E-Commerce</span>
          <span> Nueva Etapa </span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/" className="me-3 text-info">
            Inicio
          </Nav.Link>
          <Nav.Link as={Link} to="/electronics" className="me-3 text-info">
            Electrónica
          </Nav.Link>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              as={Link}
              to="/administracion"
              className="me-2"
            >
              Administración
            </Button>

            <Link to="/carrito" className="text-info">
              <FaShoppingCart size={22} className="ms-2" />
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
