import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Tienda Chichos</Link>
      </h1>
      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        {!user && <Link to="/login">Login Admin</Link>}
        {user?.type === "admin" && <Link to="/admin">Panel</Link>}
      </nav>
    </header>
  );
}

export default Header;
