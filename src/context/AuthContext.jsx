import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Inicializamos el token leyéndolo de localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Iniciar sesión
  const login = (username, password) => {
    if (username === "admin" && password === "admin1234") {
      const token = `fake-token-${username}`;
      setToken(token);
      localStorage.setItem("token", token);
      // Se guarda token en localStorage
      return true;
    }
    // Caso usuario o contraseña errónea
    return false;
  };

  // Cerrar sesión
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    // Token borrado del localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
