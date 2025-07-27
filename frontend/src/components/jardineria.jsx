import { Visualizar } from  '../components/Visualizar';
import './jardineria.css'

export function Jardineria() {
  return (
    <div className="jardineria-container">
      <div className="category-header">
        <h1>🌱 Productos de Jardinería</h1>
        <p>Herramientas y accesorios para tu jardín perfecto</p>
      </div>
      <Visualizar categoria="Jardinería" />
    </div>
  );
}