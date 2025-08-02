// src/components/common/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🐾 Tienda Chichos</h3>
            <p>Todo lo que tu mascota necesita</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/categorias">Categorías</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📧 info@tiendachichos.com</p>
            <p>📱 +54 11 1234-5678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Tienda Chichos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;