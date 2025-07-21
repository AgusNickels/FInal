import { useState } from 'react';

export function Crear() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio_lista: '',
    precio_efectivo: '',
    stock: '',
    imagen_url: '',
    categoria_id: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje("✅ Producto creado correctamente.");
        setForm({
          nombre: '',
          descripcion: '',
          precio_lista: '',
          precio_efectivo: '',
          stock: '',
          imagen_url: '',
          categoria_id: ''
        });
      } else {
        setMensaje("❌ Error: " + result.message);
      }

    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el backend.");
    }
  };

  return (
    <div className="crear-container">
      <h2>Crear producto</h2>
      <form className="crear-form" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input type="number" name="precio_lista" placeholder="Precio lista" value={form.precio_lista} onChange={handleChange} required />
        <input type="number" name="precio_efectivo" placeholder="Precio efectivo" value={form.precio_efectivo} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input type="text" name="imagen_url" placeholder="URL de la imagen" value={form.imagen_url} onChange={handleChange} />
        <select name="categoria_id" value={form.categoria_id} onChange={handleChange} required>
          <option value="">Seleccionar categoría</option>
          <option value="1">Perros</option>
          <option value="2">Gatos</option>
          <option value="3">Jardinería</option>
          <option value="4">Otros</option>
        </select>
        <button type="submit">Crear</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
