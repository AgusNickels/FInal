import { useState, useEffect } from "react";
import "./ProductForm.css";

function ProductForm({ onProductoCreado, productoAEditar, cancelarEdicion }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagen_url: "",
    precio_lista: "",
    precio_efectivo: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (productoAEditar) {
      setForm(productoAEditar);
    } else {
      setForm({
        nombre: "",
        descripcion: "",
        imagen_url: "",
        precio_lista: "",
        precio_efectivo: "",
      });
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = productoAEditar
      ? `http://localhost:3005/productos/${productoAEditar.id}`
      : "http://localhost:3005/productos";

    const metodo = productoAEditar ? "PUT" : "POST";

    const res = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMensaje(productoAEditar ? "Producto editado con éxito" : "Producto creado con éxito");
      setForm({
        nombre: "",
        descripcion: "",
        imagen_url: "",
        precio_lista: "",
        precio_efectivo: "",
      });
      onProductoCreado();
      if (productoAEditar) cancelarEdicion();
    } else {
      setMensaje("Error al guardar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{productoAEditar ? "Editar producto" : "Agregar producto"}</h3>

      <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
      <input type="text" name="imagen_url" placeholder="URL de la imagen" value={form.imagen_url} onChange={handleChange} required />
      <input type="number" name="precio_lista" placeholder="Precio lista" value={form.precio_lista} onChange={handleChange} required />
      <input type="number" name="precio_efectivo" placeholder="Precio efectivo" value={form.precio_efectivo} onChange={handleChange} required />

      <button type="submit">{productoAEditar ? "Actualizar" : "Guardar"}</button>
      {productoAEditar && (
        <button type="button" className="cancelar" onClick={cancelarEdicion}>Cancelar</button>
      )}
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}

export default ProductForm;
