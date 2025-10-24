import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FcShop } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <div className="d-flex align-items-center">
              <FcShop className="me-3" size={50} />
              <span>
                &copy; 2025 <span className="fw-bold">TiendaLeo</span>. Todos
                los derechos reservados.
              </span>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <a href="#" className="text-white me-3">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
              <a
                href="https://github.com/Leoguzmand/ProjectReact-25235-LG"
                target="_blank"
                className="text-white me-3"
              >
                <i className="fa fa-github fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
