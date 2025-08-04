import "./productcard.css";
import { BsWhatsapp } from "react-icons/bs";

export function ProductCard({ producto }) {
  const linkWhatsapp = `https://wa.me/541168928007?text=Hola! Me interesa "${producto.nombre}"`;

  return (
    <div className="product-card">
      <h3>{producto.nombre}</h3>
      <span className="categoria">Categoría ID: {producto.categoria_id}</span>
      <p>{producto.descripcion}</p>
      <div className="precios">
        <span className="badge">💰 Lista: ${producto.precio_lista}</span>
        <span className="badge">⚡ Efectivo: ${producto.precio_efectivo}</span>
        <span className="badge">📦 Stock: {producto.stock}</span>
      </div>
      <a href={linkWhatsapp} className="whatsapp-btn" target="_blank" rel="noreferrer">
        <BsWhatsapp /> Consultar por WhatsApp
      </a>
    </div>
  );
}

