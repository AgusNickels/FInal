import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export function ProductList({ productos, categorias, categoriaActiva }) {
  return (
    <div className="product-list">
      {Object.entries(categorias).map(([catId, nombreCat]) => {
        const idNumerico = parseInt(catId);
        const productosFiltrados = productos.filter(
          (p) => p.categoria_id === idNumerico
        );

        if (productosFiltrados.length === 0) return null;

        // Si hay una categoría activa desde la URL, solo mostrar esa sección
        if (categoriaActiva && idNumerico !== categoriaActiva) return null;

        return (
          <section key={catId} id={`categoria-${catId}`}>
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

