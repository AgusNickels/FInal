// src/services/productService.js
import api from './api';

export const productService = {
  // GET - Obtener todos los productos
  getAll: async () => {
    try {
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  // GET - Obtener producto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  },

  // GET - Buscar productos (por nombre o categoría)
  search: async (query) => {
    try {
      const response = await api.get(`/productos/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  },

  // GET - Filtrar por categoría
  getByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/productos/categoria/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al filtrar por categoría: ${error.message}`);
    }
  },

  // POST - Crear nuevo producto
  create: async (productData) => {
    try {
      const response = await api.post('/productos', productData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  },

  // PUT - Actualizar producto completo
  update: async (id, productData) => {
    try {
      const response = await api.put(`/productos/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  },

  // PATCH - Actualizar producto parcial
  partialUpdate: async (id, partialData) => {
    try {
      const response = await api.patch(`/productos/${id}`, partialData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  },

  // DELETE - Eliminar producto
  delete: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
};