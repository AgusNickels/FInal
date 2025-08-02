// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFetch = (serviceFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await serviceFunction();
        setData(result);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await serviceFunction();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Hook específico para operaciones CRUD
export const useCRUD = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = async (operation) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await operation();
      setSuccess(true);
      
      // Auto-limpiar success después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(false);
  };

  return { loading, error, success, execute, clearMessages };
};