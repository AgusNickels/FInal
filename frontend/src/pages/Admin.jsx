// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio_lista: "",
    precio_efectivo: "",
    stock: "",
    imagen_url: "",
    categoria_id: "",
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
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
          categoria_id: "",
        });
      });
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm("¿Eliminar producto?");
    if (!confirmar) return;
    fetch(`http://localhost:3005/productos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => cargarProductos());
  };

  return (
    <section className="admin">
      <h2>Panel de Administración</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required />
        <input name="precio_lista" value={form.precio_lista} onChange={handleChange} placeholder="Precio Lista" required />
        <input name="precio_efectivo" value={form.precio_efectivo} onChange={handleChange} placeholder="Precio Efectivo" required />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />
        <input name="imagen_url" value={form.imagen_url} onChange={handleChange} placeholder="URL Imagen" required />
        <input name="categoria_id" value={form.categoria_id} onChange={handleChange} placeholder="ID Categoría" required />
        <button type="submit">Crear producto</button>
      </form>

      <div className="admin-listado">
        {productos.map((p) => (
          <div key={p.id} className="admin-card">
            <img src={p.imagen_url} alt={p.nombre} />
            <div className="info">
              <h3>{p.nombre}</h3>
              <span className="categoria">Categoría ID: {p.categoria_id}</span>
              <p className="descripcion">{p.descripcion}</p>
              <div className="precios">
                <span>💰 Lista: ${p.precio_lista}</span>
                <span>💸 Efectivo: ${p.precio_efectivo}</span>
                <span>📦 Stock: {p.stock} u.</span>
              </div>
            </div>
            <button className="btn-eliminar" onClick={() => eliminarProducto(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
