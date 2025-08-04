import "../pages/NotFound.css";

function NotFound() {
  return (
    <section className="notfound-container">
      <h2 className="notfound-title">404 - Página no encontrada</h2>
      <p className="notfound-text">Lo sentimos, la página que buscás no existe.</p>
      <a href="/" className="notfound-link">Volver al inicio</a>
    </section>
  );
}

export default NotFound;
