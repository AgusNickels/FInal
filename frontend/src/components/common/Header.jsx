// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h1>🐾 Tienda Chichos</h1>
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="nav-desktop">
          <Link to="/" className={isActive('/')}>
            Inicio
          </Link>
          <Link to="/productos" className={isActive('/productos')}>
            Productos
          </Link>
          <Link to="/categorias" className={isActive('/categorias')}>
            Categorías
          </Link>
          <Link to="/sobre-nosotros" className={isActive('/sobre-nosotros')}>
            Sobre Nosotros
          </Link>
        </nav>

        {/* Controles */}
        <div className="header-controls">
          {/* Botón tema */}
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Botón menú móvil */}
          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Navegación Móvil */}
      <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        <Link 
          to="/" 
          className={isActive('/')}
          onClick={() => setIsMenuOpen(false)}
        >
          Inicio
        </Link>
        <Link 
          to="/productos" 
          className={isActive('/productos')}
          onClick={() => setIsMenuOpen(false)}
        >
          Productos
        </Link>
        <Link 
          to="/categorias" 
          className={isActive('/categorias')}
          onClick={() => setIsMenuOpen(false)}
        >
          Categorías
        </Link>
        <Link 
          to="/sobre-nosotros" 
          className={isActive('/sobre-nosotros')}
          onClick={() => setIsMenuOpen(false)}
        >
          Sobre Nosotros
        </Link>
      </nav>
    </header>
  );
};

export default Header;