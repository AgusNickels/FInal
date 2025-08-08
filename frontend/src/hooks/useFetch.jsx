import { useState, useEffect } from "react";

export function useFetch(url, options = {}, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = async (customOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        ...options,
        ...customOptions,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          ...customOptions.headers,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.mensaje || "Error en la solicitud");
      setData(json);
      return json;
    } catch (err) {
      console.error("useFetch error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
