import { Routes, Route, Link } from 'react-router-dom'
import { Visualizar } from './components/Visualizar'
import { Crear } from './components/Crear'
import { Inicio } from './components/Inicio'
import './style.css'

export default function App() {
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">LOGO</h1>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/perros">Perros</Link></li>
          <li><Link to="/gatos">Gatos</Link></li>
          <li><Link to="/jardineria">Jardinería</Link></li>
          <li><Link to="/otros">Otros</Link></li>
          <li><Link to="/formulario">Formulario</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perros" element={<Visualizar categoria="Perros" />} />
        <Route path="/gatos" element={<Visualizar categoria="Gatos" />} />
        <Route path="/jardineria" element={<Visualizar categoria="Jardinería" />} />
        <Route path="/otros" element={<Visualizar categoria="Otros" />} />
        <Route path="/formulario" element={<Crear />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  )
}
