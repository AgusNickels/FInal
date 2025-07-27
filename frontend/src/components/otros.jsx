import { Visualizar } from '../components/Visualizar';
import './otros.css'

export function Otros() {
  return (
    <div className="otros-container">
      <div className="category-header">
        <h1>🐹 Otras Mascotas</h1>
        <p>Productos para todas tus mascotas exóticas y especiales</p>
      </div>
      <Visualizar categoria="Otros" />
    </div>
  );
}