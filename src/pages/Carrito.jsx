import { useContext, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity, total } =
    useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simular Proceso de Pago
    setTimeout(() => {
      alert("¡Compra realizada con éxito!");
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
    // Toast de compra exitosa
    setIsCheckingOut(false);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <Container className="my-4">
      <h3>Sección de Compras</h3>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4 ">
            <h4 className="mb-0">
              <FaShoppingCart size={32} className="me-2" />
              Mi Carrito
            </h4>

            <span className="badge bg-primary fs-6">
              {getTotalItems()}{" "}
              {getTotalItems() === 1 ? "producto" : "productos"}
            </span>
          </div>

          {cartItems.lenght === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4" style={{ fontSize: "4rem" }}>
                <FaShoppingCart size={32} />
              </div>
              <h3 className="text-muted mb-3">Tu carrito está vacío</h3>
              <p className="text-muted mb-4">
                ¡Descubre productos increíbles y comienza a comprar!
              </p>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/")}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <Row>
              {/* Lista de Productos */}
              <Col className="lg-8">
                <Card className="shadow-sm">
                  <CardHeader className="bg-white flex-col justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <FaShoppingCart size={32} className="me-2" />
                      Productos en el carrito
                    </h5>
                    <span className="badge bg-primary">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "producto" : "productos"}
                    </span>
                  </CardHeader>

                  <CardBody className="p-0">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border-bottom p-3">
                        <Row className="align-items-center">
                          {/* Imagen del producto */}
                          <div className="col-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="rounded img-fluid"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                              }}
                            />
                          </div>

                          {/* Información del producto */}
                          <div className="col-6">
                            <h6 className="mb-1 small fw-bold text-truncate">
                              {item.title}
                            </h6>
                            <p className="text-muted mb-1 small">
                              ${item.price} c/u
                            </p>
                            <div className="d-flex align-items-center mt-2">
                              {/* Selector de cantidad */}
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1,
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  style={{ width: "32px", height: "32px" }}
                                >
                                  −
                                </button>
                                <span className="mx-2 fw-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1,
                                    )
                                  }
                                  style={{ width: "32px", height: "32px" }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Precio y eliminar */}
                          <div className="col-3 text-end">
                            <div className="d-flex flex-column align-items-end gap-2">
                              <span className="text-primary fw-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeFromCart(item.id)}
                                title="Eliminar producto"
                                style={{ width: "32px", height: "32px" }}
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                        </Row>
                      </div>
                    ))}
                  </CardBody>
                </Card>

                {/* Acciones del carrito */}
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/")}
                  >
                    ← Continuar Comprando
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </Col>

              {/* Resumen de compra */}
              <Col className="col-lg-4 mt-4 mt-lg-0">
                <Card className="shadow-sm sticky-top" style={{ top: "20px" }}>
                  <CardHeader className="bg-white">
                    <h5 className="mb-0">Resumen de compra</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Productos ({getTotalItems()})</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío</span>
                      <span className="text-success">Gratis</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total</strong>
                      <strong className="text-primary fs-5">
                        ${total.toFixed(2)}
                      </strong>
                    </div>

                    <button
                      className="btn btn-success w-100 py-2"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Procesando...
                        </>
                      ) : (
                        "Finalizar Compra"
                      )}
                    </button>

                    <div className="mt-3 text-center">
                      <small className="text-muted">
                        ✅ Pago seguro · 🔄 Recibo de pago
                      </small>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
