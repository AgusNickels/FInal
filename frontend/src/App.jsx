// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
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
      {/* Menú de navegación */}
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Rutas de productos */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:categoria" element={<Productos />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Panel Admin protegido */}
          <Route
            path="/admin"
            element={
              user?.type === "admin" ? <Admin /> : <Navigate to="/login" />
            }
          />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
