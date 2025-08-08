import "./ProductCard.css";
import { FaWhatsapp } from "react-icons/fa";

export function ProductCard({ producto }) {
  const whatsappNumber = "541168928007"; // sin + ni espacios
  const message = `Hola, me gustaría consultar por el producto: ${producto.nombre}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="product-card">
      <img src={producto.imagen_url} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p><strong>Precio lista:</strong> ${producto.precio_lista}</p>
      <p><strong>Precio efectivo:</strong> ${producto.precio_efectivo}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp /> Consultar
      </a>
    </div>
  );
}
