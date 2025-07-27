import { Visualizar } from '../components/Visualizar';
import './Perro.css';

export function Perros() {
  return (
    <div className="perros-container">
      <div className="category-header">
        <h1>🐕 Productos para Perros</h1>
        <p>Encuentra todo lo que necesita tu mejor amigo</p>
      </div>
      <Visualizar categoria="Perros" />
    </div>
  );
}