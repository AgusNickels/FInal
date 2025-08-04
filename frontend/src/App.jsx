import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <header className="app-header">
        <h1><Link to="/">Tienda Chichos</Link></h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          {!user && <Link to="/login">Login Admin</Link>}
          {user && user.type === "admin" && <Link to="/admin">Panel</Link>}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={user?.type === "admin" ? <Admin /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
