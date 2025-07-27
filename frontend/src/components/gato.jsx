import { Visualizar } from  '../components/Visualizar';
import './gato.css';

export function Gatos() {
  return (
    <div className="gatos-container">
      <div className="category-header">
        <h1>🐱 Productos para Gatos</h1>
        <p>Todo para el cuidado y entretenimiento de tu felino</p>
      </div>
      <Visualizar categoria="Gatos" />
    </div>
  );
}