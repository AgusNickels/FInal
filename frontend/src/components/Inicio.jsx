import './inicio.css';
export function Inicio() {
  return (
    <div className="inicio-container">
      <div className="hero-section">
        <h1>Tienda de mascotas Chicho's</h1>
        <p className="hero-text">
          Todo lo que necesitas para tu mascota y tu jardín en un solo lugar.
        </p>
        <div className="features">
          <div className="feature-card">
            <h3>🐕 Productos para Perros</h3>
            <p>Juguetes, alimentos y accesorios de calidad para tu mejor amigo.</p>
          </div>
          <div className="feature-card">
            <h3>🐱 Productos para Gatos</h3>
            <p>Todo lo necesario para el cuidado y entretenimiento de tu gato.</p>
          </div>
          <div className="feature-card">
            <h3>🌱 Jardinería</h3>
            <p>Macetas y todo para tu jardín perfecto.</p>
          </div>
          <div className="feature-card">
            <h3>🐹 Otras mascotas</h3>
            <p>Accesorios diversos para todas tus mascotas exóticas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}