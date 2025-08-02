// src/pages/Products.jsx
import React, { useState } from 'react';
import { productService } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Cargar todos los productos
  const { data: products, loading, error, refetch } = useFetch(
    () => productService.getAll(),
    []
  );

  // Filtrar productos
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.categoria_id.toString() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Nuestros Productos</h1>
          <p>Encuentra todo lo que necesita tu mascota</p>
        </div>

        {/* Filtros */}
        <ProductFilter 
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />

        {/* Resultados */}
        <div className="products-results">
          <div className="results-info">
            <span>{filteredProducts.length} productos encontrados</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h3>No se encontraron productos</h3>
              <p>Intenta con otros términos de búsqueda o revisa los filtros</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onUpdate={refetch}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;