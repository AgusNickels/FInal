import { Routes, Route, Link } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import { Perros } from './components/Perro';
import { Gatos } from './components/gato';
import { Jardineria } from './components/jardineria';
import { Otros } from './components/otros';
import { Contactanos } from './components/contactanos';
import { Formulario } from './components/Formulario';
import './style.css'

export default function App() {
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">Tienda Chicho's</h1>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/perros">Perros</Link></li>
          <li><Link to="/gatos">Gatos</Link></li>
          <li><Link to="/jardineria">Jardinería</Link></li>
          <li><Link to="/otros">Otros</Link></li>
          <li><Link to="/contactanos">Contáctanos</Link></li>
          <li><Link to="/Formulario">Formulario</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perros" element={<Perros />} />
        <Route path="/gatos" element={<Gatos />} />
        <Route path="/jardineria" element={<Jardineria />} />
        <Route path="/otros" element={<Otros />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/Formulario" element={<Formulario />} />
        <Route path="*" element={<div className="not-found"><h2>404 - Página no encontrada</h2></div>} />
      </Routes>
    </>
  )
}