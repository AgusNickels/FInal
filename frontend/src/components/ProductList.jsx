import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export function ProductList({ productos, categorias }) {
  return (
    <div className="product-list">
      {Object.entries(categorias).map(([catId, nombreCat]) => {
        const productosFiltrados = productos.filter(
          (p) => p.categoria_id === parseInt(catId)
        );
        if (productosFiltrados.length === 0) return null;

        return (
          <section key={catId}>
            <h2>{nombreCat}</h2>
            <div className="productos-grid">
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

