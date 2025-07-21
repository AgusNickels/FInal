import { useState, useEffect } from 'react';

export function Visualizar({ categoria }) {
  const categorias = {
    "Perros": 1,
    "Gatos": 2,
    "Jardinería": 3,
    "Otros": 4
  };

  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({ 
    nombre: '', 
    precio_lista: '', 
    categoria_id: categorias[categoria] || '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const limpiarFiltros = () => {
    setFiltros({ 
      nombre: '', 
      precio_lista: '', 
      categoria_id: categorias[categoria] || '' 
    });
  };

  const buscarProductos = async () => {
    setLoading(true);
    setError('');
    
    try {
      let endpoint = 'http://localhost:3005/productos';

      // Construir query string con filtros no vacíos
      const query = Object.entries(filtros)
        .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      if (query) {
        endpoint += `?${query}`;
      }

      console.log('Consultando:', endpoint); // Para debug

      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setProductos(result);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError('Error al cargar los productos. Verifica que el servidor esté funcionando.');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  // Buscar productos cuando cambien los filtros
  useEffect(() => {
    buscarProductos();
  }, [filtros]);

  // Actualizar categoria_id cuando cambie la categoría
  useEffect(() => {
    setFiltros(prev => ({ 
      ...prev, 
      categoria_id: categorias[categoria] || '' 
    }));
  }, [categoria]);

  const tieneFiltroslActivos = filtros.nombre !== '' || filtros.precio_lista !== '';

  return (
    <>
      <h3 className="visualizar-title">Productos de {categoria}</h3>
      
      <form className="filter-sector" onSubmit={(e) => e.preventDefault()}>
        <div className="first-line">
          <div className="left-filter">
            <input
              type="text"
              placeholder="Buscar por nombre"
              name="nombre"
              className="input"
              value={filtros.nombre}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Precio máximo"
              name="precio_lista"
              className="input"
              value={filtros.precio_lista}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>
          <div className="right-filter">
            <button 
              type="button"
              className={`btn-filter ${tieneFiltroslActivos ? 'visible' : 'hidden'}`}
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </form>

      {/* Estado de carga */}
      {loading && (
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button 
            onClick={buscarProductos} 
            className="retry-button"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de productos */}
      {!loading && !error && (
        <>
          {productos.length === 0 ? (
            <div className="no-products">
              <p>No se encontraron productos que coincidan con los filtros.</p>
            </div>
          ) : (
            <>
              <p className="products-count">
                {productos.length} producto{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''}
              </p>
              
              {productos.map((item) => (
                <div key={item.id} className="item">
                  <h3 className="title">{item.nombre}</h3>
                  <small className="category-badge">Categoría ID: {item.categoria_id}</small>
                  <p className="description">{item.descripcion}</p>
                  <div className="product-details">
                    <span className="price-item">
                      💰 Precio Lista: ${parseFloat(item.precio_lista).toFixed(2)}
                    </span>
                    {item.precio_efectivo && (
                      <span className="price-item">
                        💳 Precio Efectivo: ${parseFloat(item.precio_efectivo).toFixed(2)}
                      </span>
                    )}
                    <span className="price-item">
                      📦 Stock: {item.stock} unidades
                    </span>
                  </div>
                  {item.imagen_url && (
                    <img 
                      src={item.imagen_url} 
                      alt={item.nombre} 
                      className="product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}