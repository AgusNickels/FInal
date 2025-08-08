import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./EditarProducto.css";

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio_lista: "",
    precio_efectivo: "",
    stock: "",
    imagen_url: "",
    categoria_id: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch producto específico
  const { 
    data: producto, 
    loading: productoLoading, 
    error: productoError 
  } = useFetch(`http://localhost:3005/productos/${id}`);

  // Fetch categorías
  const { data: categorias, loading: categoriasLoading } = useFetch(
    "http://localhost:3005/categorias"
  );

  // useFetch para actualizar producto (sin autoFetch)
  const { refetch: updateProduct, loading: updating } = useFetch(
    `http://localhost:3005/productos/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    false
  );

  // Actualizar form cuando se carga el producto
  useEffect(() => {
    if (producto) {
      setForm(producto);
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const result = await updateProduct({
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

  if (productoLoading) {
    return (
      <main>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (productoError) {
    return (
      <main>
        <div className="error-container">
          <h2>Error al cargar el producto</h2>
          <p>{productoError}</p>
          <button onClick={() => navigate("/productos")} className="back-button">
            Volver a productos
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Editar producto</h1>
      
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          ✅ ¡Producto actualizado exitosamente! Redirigiendo...
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="alert alert-error">
          ❌ Error al actualizar el producto. Intenta nuevamente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input 
          name="nombre" 
          value={form.nombre} 
          onChange={handleChange} 
          placeholder="Nombre" 
          required 
          disabled={updating}
        />
        
        <input 
          name="descripcion" 
          value={form.descripcion} 
          onChange={handleChange} 
          placeholder="Descripción" 
          required 
          disabled={updating}
        />
        
        <input 
          name="precio_lista" 
          type="number" 
          value={form.precio_lista} 
          onChange={handleChange} 
          placeholder="Precio lista" 
          required 
          disabled={updating}
        />
        
        <input 
          name="precio_efectivo" 
          type="number" 
          value={form.precio_efectivo} 
          onChange={handleChange} 
          placeholder="Precio efectivo" 
          required 
          disabled={updating}
        />
        
        <input 
          name="stock" 
          type="number" 
          value={form.stock} 
          onChange={handleChange} 
          placeholder="Stock" 
          required 
          disabled={updating}
        />
        
        <input 
          name="imagen_url" 
          value={form.imagen_url} 
          onChange={handleChange} 
          placeholder="URL imagen" 
          required 
          disabled={updating}
        />
        
        <select 
          name="categoria_id" 
          value={form.categoria_id} 
          onChange={handleChange} 
          required
          disabled={updating || categoriasLoading}
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
          disabled={updating || categoriasLoading}
          className={updating ? 'loading' : ''}
        >
          {updating ? (
            <>
              <span className="spinner-small"></span>
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </button>
      </form>
    </main>
  );
}

export default EditarProducto;