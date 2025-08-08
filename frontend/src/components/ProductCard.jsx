import "./ProductCard.css";

export function ProductCard({ producto }) {
  return (
    <div className="product-card">
      <img src={producto.imagen_url} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio lista: ${producto.precio_lista}</p>
      <p>Precio efectivo: ${producto.precio_efectivo}</p>
      <p>Stock: {producto.stock}</p>
    </div>
  );
}
