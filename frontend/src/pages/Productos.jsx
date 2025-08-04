import { useEffect, useState } from "react";
import { Filtro } from "../components/Filtro";
import { ProductList } from "../components/ProductList";
import "../pages/productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  // Simulamos los nombres de categorías por ID
  const categorias = {
    1: "Perros",
    2: "Gatos",
    3: "Accesorios",
    4: "Higiene",
    5: "Medicamentos",
    6: "Otras Mascotas",
    7: "Jardinería"
  };

  useEffect(() => {
    fetch("http://localhost:3005/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const handleChange = (campo, valor) => {
    if (campo === "nombre") setNombre(valor);
    if (campo === "precioMax") setPrecioMax(valor);
  };

  const handleReset = () => {
    setNombre("");
    setPrecioMax("");
  };

  const productosFiltrados = productos.filter((p) => {
    const nombreMatch = p.nombre.toLowerCase().includes(nombre.toLowerCase());
    const precioMatch = precioMax === "" || p.precio_lista <= Number(precioMax);
    return nombreMatch && precioMatch;
  });

  return (
    <main className="productos-page">
      <h1>Productos</h1>
      <Filtro
        nombre={nombre}
        precioMax={precioMax}
        onChange={handleChange}
        onReset={handleReset}
      />
      <p>{productosFiltrados.length} productos encontrados</p>
      <ProductList productos={productosFiltrados} categorias={categorias} />
    </main>
  );
}

export default Productos;
