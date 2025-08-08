import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./Formulario.css";

function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio_lista: "",
    precio_efectivo: "",
    stock: "",
    imagen_url: "",
    categoria_id: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'loading', 'success', 'error'
  const navigate = useNavigate();

  // Fetch para obtener categorías dinámicamente
  const { data: categorias, loading: categoriasLoading } = useFetch(
    "http://localhost:3005/categorias"
  );

  // useFetch para crear producto (sin autoFetch)
  const { refetch: createProduct, loading: creating } = useFetch(
    "http://localhost:3005/productos",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    false // No hacer fetch automático
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const result = await createProduct({
        body: JSON.stringify(form),
      });

      if (result) {
        setSubmitStatus('success');
        setTimeout(() => {
          navigate("/productos");
        }, 1500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    }
  };

  return (
    <main>
      <h1>Crear nuevo producto</h1>
      
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          ✅ ¡Producto creado exitosamente! Redirigiendo...
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="alert alert-error">
          ❌ Error al crear el producto. Intenta nuevamente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={form.nombre} 
          onChange={handleChange} 
          required 
          disabled={creating}
        />
        
        <input 
          name="descripcion" 
          placeholder="Descripción" 
          value={form.descripcion} 
          onChange={handleChange} 
          required 
          disabled={creating}
        />
        
        <input 
          name="precio_lista" 
          type="number" 
          placeholder="Precio lista" 
          value={form.precio_lista} 
          onChange={handleChange} 
          required 
          disabled={creating}
        />
        
        <input 
          name="precio_efectivo" 
          type="number" 
          placeholder="Precio efectivo" 
          value={form.precio_efectivo} 
          onChange={handleChange} 
          required 
          disabled={creating}
        />
        
        <input 
          name="stock" 
          type="number" 
          placeholder="Stock" 
          value={form.stock} 
          onChange={handleChange} 
          required 
          disabled={creating}
        />
        
        <input 
          name="imagen_url" 
          placeholder="URL de imagen" 
          value={form.imagen_url} 
          onChange={handleChange} 
          required 
          disabled={creating}
        />
        
        <select 
          name="categoria_id" 
          value={form.categoria_id} 
          onChange={handleChange} 
          required
          disabled={creating || categoriasLoading}
        >
          <option value="">
            {categoriasLoading ? "Cargando categorías..." : "Seleccionar categoría"}
          </option>
          {categorias?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        
        <button 
          type="submit" 
          disabled={creating || categoriasLoading}
          className={creating ? 'loading' : ''}
        >
          {creating ? (
            <>
              <span className="spinner-small"></span>
              Creando...
            </>
          ) : (
            "Crear"
          )}
        </button>
      </form>
    </main>
  );
}

export default CrearProducto;