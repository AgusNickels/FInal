// src/components/Filtro.jsx
import "../components/Filtro.css";

export function Filtro({ nombre, precioMax, onChange, onReset }) {
  return (
    <div className="filtro-container">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={nombre}
        onChange={(e) => onChange("nombre", e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={precioMax}
        onChange={(e) => onChange("precioMax", e.target.value)}
      />
      <button onClick={onReset}>Limpiar filtros</button>
    </div>
  );
}
