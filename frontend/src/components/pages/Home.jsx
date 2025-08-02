// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🐾 Bienvenido a Tienda Chichos</h1>
          <p>Todo lo que tu mascota necesita en un solo lugar</p>
          <div className="hero-buttons">
            <Link to="/productos" className="btn btn-primary">
              Ver Productos
            </Link>
            <Link to="/categorias" className="btn btn-secondary">
              Explorar Categorías
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="pet-icons">
            <span>🐕</span>
            <span>🐱</span>
            <span>🐰</span>
            <span>🐹</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>¿Por qué elegir Tienda Chichos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Productos de Calidad</h3>
              <p>Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad para tu mascota.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Envío Rápido</h3>
              <p>Recibe tus productos en la comodidad de tu hogar con nuestro servicio de envío express.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Mejores Precios</h3>
              <p>Ofrecemos precios competitivos y descuentos especiales por pagos en efectivo.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🩺</div>
              <h3>Asesoramiento Experto</h3>
              <p>Contamos con especialistas que te ayudarán a elegir lo mejor para tu mascota.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>¿Listo para consentir a tu mascota?</h2>
          <p>Explora nuestro catálogo completo de productos</p>
          <Link to="/productos" className="btn btn-large">
            Ir a Productos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;