import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Administracion = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia token y localStorage
    navigate("/login"); // redirige a login
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Estás dentro de una ruta protegida.</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Administracion;
