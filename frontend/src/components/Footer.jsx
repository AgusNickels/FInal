import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Tienda Chichos - Todos los derechos reservados</p>
      <p>Desarrollado por Agustín</p>
    </footer>
  );
}

export default Footer;
