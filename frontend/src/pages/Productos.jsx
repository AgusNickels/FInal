import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Filtro } from "../components/Filtro";
import { ProductList } from "../components/ProductList";
import "../pages/productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const { categoria } = useParams();

  // Mapeamos categoría de la URL → ID
  const categoriasPorNombre = {
    perro: 1,
    gato: 2,
    accesorios: 3,
    higiene: 4,
    medicamentos: 5,
    "otras-mascotas": 6,
    jardineria: 7,
  };

  // ID → nombre para mostrar en títulos
  const nombresPorId = {
    1: "Perros",
    2: "Gatos",
    3: "Accesorios",
    4: "Higiene",
    5: "Medicamentos",
    6: "Otras Mascotas",
    7: "Jardinería",
  };

  const categoriaId = categoria ? categoriasPorNombre[categoria] : null;

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
    const categoriaMatch = categoriaId ? p.categoria_id === categoriaId : true;
    return nombreMatch && precioMatch && categoriaMatch;
  });

  return (
    <main className="productos-page">
      <h1>
        Productos {categoriaId ? `– ${nombresPorId[categoriaId]}` : ""}
      </h1>

      <Filtro
        nombre={nombre}
        precioMax={precioMax}
        onChange={handleChange}
        onReset={handleReset}
      />

      <p>{productosFiltrados.length} productos encontrados</p>

      <ProductList
        productos={productosFiltrados}
        categorias={nombresPorId}
        categoriaActiva={categoriaId}
      />
    </main>
  );
}

export default Productos;
