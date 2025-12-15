import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";

const API_URL = "https://692a74d17615a15ff24cb5b0.mockapi.io/api/Products";

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // Obtener productos
  const getProductos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .then(() => console.info("Se realizó fetch a la API"))
      .catch((error) => console.error("Error al obtener productos: ", error));
  };

  // Cerrar modal y limpiar formulario
  const handleClose = () => {
    setShow(false);
    setForm({ title: "", description: "", price: "", stock: "", image: "" });
    setEditId(null);
  };

  // Abrir modal
  const handleShow = (producto) => {
    setShow(true);
    if (producto) {
      setForm({
        ...producto,
        price: Number(producto.price),
        stock: Number(producto.stock),
      });
      setEditId(producto.id);
    }
  };

  // Registrar productos (crear nuevo o editar existente)
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    };

    // Falta validación del producto (precio mayor o igual a 0)
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar el producto");
        return res.json();
      })
      .then(() => {
        handleClose();
        getProductos();
      })
      .catch((error) => console.error("Error: ", error));
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    // **Hacer Modal para eliminar producto y alerta Toast**
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar el producto");
        getProductos();
      })
      .catch((error) => console.error("Error: ", error));
  };

  // Productos al inicializar
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex bg-light justify-content-between">
        <h2 className="p-4 text-primary">Tabla de Productos</h2>
        <Button
          className="m-4 d-flex align-items-center gap-2"
          onClick={() => handleShow()}
        >
          <FiPlusCircle size={20} />
          Agregar Producto
        </Button>
      </div>

      <Table striped bordered hover responsive className="align-middle">
        <thead className="encabezado fw-bold">
          <tr>
            <th style={{ width: "15%" }}>Título</th>
            <th style={{ width: "30%" }}>Descripción</th>
            <th style={{ width: "10%" }}>Precio</th>
            <th style={{ width: "10%" }}>Stock</th>
            <th style={{ width: "15%" }}>Imagen</th>
            <th style={{ width: "20%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td className="text-truncate" style={{ maxWidth: "150px" }}>
                {prod.title}
              </td>
              <td className="text-truncate" style={{ maxWidth: "250px" }}>
                {prod.description}
              </td>
              <td>$ {Number(prod.price).toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                {prod.image?.startsWith("http") ? (
                  <img
                    src={prod.image}
                    alt={prod.title}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span>{prod.image}</span>
                )}
              </td>
              <td>
                <div className="d-flex justify-content-center flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleShow(prod)}
                    className="d-flex align-items-center gap-1"
                  >
                    <FaPenToSquare />
                    <span className="d-none d-md-inline">Editar</span>
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => eliminarProducto(prod.id)}
                    className="d-flex align-items-center gap-1"
                  >
                    <FaRegTrashCan />
                    <span className="d-none d-md-inline">Eliminar</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Editar" : "Agregar"} producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={form.price}
                type="number"
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
              />
            </Form.Group>

            <Button className="mt-2" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;
