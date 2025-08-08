// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import { ToggleTheme } from "./ToggleTheme";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const categorias = [
    { path: "perro", nombre: "Perros" },
    { path: "gato", nombre: "Gatos" },
    { path: "accesorios", nombre: "Accesorios" },
    { path: "higiene", nombre: "Higiene" },
    { path: "medicamentos", nombre: "Medicamentos" },
    { path: "otras-mascotas", nombre: "Otras Mascotas" },
    { path: "jardineria", nombre: "Jardinería" }
  ];

  return (
    <header className="app-header">
      <h1>
        <Link to="/">Tienda Chichos</Link>
      </h1>

      <nav>
        <Link to="/">Inicio</Link>

        {/* Categorías con rutas dinámicas */}
        {categorias.map((cat) => (
          <Link key={cat.path} to={`/productos/${cat.path}`}>
            {cat.nombre}
          </Link>
        ))}

        {/* Admin / Panel */}
        {!user && <Link to="/login">Admin</Link>}
        {user?.type === "admin" && <Link to="/admin">Panel</Link>}
        {user && (
          <button onClick={logout} className="logout-btn">
            Cerrar sesión
          </button>
        )}

        {/* Modo oscuro/claro */}
        <ToggleTheme />
      </nav>
    </header>
  );
}

export default Navbar;

