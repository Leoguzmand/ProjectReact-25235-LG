import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await Promise.resolve(login(username, password));

      if (!result) {
        setError("Usuario o contraseña incorrectos");
        Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
        return;
      }

      Swal.fire("Sesión iniciada correctamente", "¡Bienvenido!", "success");
      navigate("/admin"); // Cambiar ruta a admin o dashboard
    } catch (err) {
      console.error("Error al hacer Login: ", err);
      setError("Error al iniciar sesión");
      Swal.fire(
        "Error al iniciar sesión",
        "Ocurrió un error al iniciar sesión",
        "error"
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={8} xl={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Ingrese su usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && <div className="alert alert-danger">{error}</div>}

                <Button type="submit" className="w-100" variant="primary">
                  Ingresar
                </Button>

                <p className="mt-3 px-2 px-md-5 fw-light">
                  Pista: Para acceder ingresa usuario <strong>admin</strong> y
                  contraseña <strong>admin1234</strong>.
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
