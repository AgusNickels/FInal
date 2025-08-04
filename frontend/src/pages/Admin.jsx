import { useEffect, useState } from "react";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio_lista: "",
    precio_efectivo: "",
    stock: "",
    imagen_url: "",
    categoria_id: ""
  });

  const token = localStorage.getItem("token");

  const cargarProductos = () => {
    fetch("http://localhost:3005/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3005/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then(() => {
        cargarProductos();
        setForm({
          nombre: "",
          descripcion: "",
          precio_lista: "",
          precio_efectivo: "",
          stock: "",
          imagen_url: "",
          categoria_id: ""
        });
      });
  };

  const eliminarProducto = (id) => {
    fetch(`http://localhost:3005/productos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => cargarProductos());
  };

  return (
    <section style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "15px" }}>Panel de Administración</h2>

      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
        <input name="precio_lista" value={form.precio_lista} onChange={handleChange} placeholder="Precio Lista" />
        <input name="precio_efectivo" value={form.precio_efectivo} onChange={handleChange} placeholder="Precio Efectivo" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <input name="imagen_url" value={form.imagen_url} onChange={handleChange} placeholder="Imagen URL" />
        <input name="categoria_id" value={form.categoria_id} onChange={handleChange} placeholder="ID Categoría" />
        <button type="submit">Crear producto</button>
      </form>

      <div>
        {productos.map((p) => (
          <div key={p.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              <strong>{p.nombre}</strong> — ${p.precio_lista} / ${p.precio_efectivo}
            </span>
            <button onClick={() => eliminarProducto(p.id)} style={{ background: "#c0392b", color: "white", border: "none", padding: "5px 10px" }}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
