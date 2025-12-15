import React from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { FaArrowCircleRight, FaShoppingCart, FaTruck } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useCart();

  const location = useLocation();

  const navigate = useNavigate();

  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

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
        </Navbar.Brand>

        {/* Bloque derecho*/}
        <div className="d-flex ms-auto align-items-center gap-4">
          {/* Navegación de Productos*/}
          <Nav className="d-flex flex-row align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className={`mx-2 fw-semibold px-2
          ${isActiveRoute("/") ? "text-primary text-decoration-underline" : "text-info"}`}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/electronics"
              className={`mx-2 fw-semibold px-2
          ${isActiveRoute("/electronics") ? "text-primary text-decoration-underline" : "text-info"}`}
            >
              Electrónica
            </Nav.Link>
          </Nav>

          {/* Nav de Administración y Carrito*/}
          <Nav className="d-flex flex-row align-items-center gap-2">
            <Button
              variant="outline-secondary"
              as={Link}
              to="/login"
              className="me-2"
            >
              Administración
            </Button>

            {/* Botón para el carrito */}
            <Button
              variant="outline-primary"
              className="position-relative d-none d-lg-flex align-items-center me-3"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart size={22} className="me-2" />
              Carrito
              {getTotalItems() > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
