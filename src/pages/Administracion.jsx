import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Administracion = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpia token y localStorage
    navigate("/login"); // Redirige a login
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Estás dentro de una ruta protegida.</p>
      <button className="btn btn-danger m-2" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <button className="btn btn-success m-2" onClick={() => navigate("/crud")}>
        Ir a Crud
      </button>
    </div>
  );
};

export default Administracion;
