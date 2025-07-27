import { useState } from 'react';
import './contactanos.css';

export function Contactanos() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías integrar con tu backend
    console.log('Formulario enviado:', form);
    setEnviado(true);
    
    // Reset form
    setTimeout(() => {
      setForm({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });
      setEnviado(false);
    }, 3000);
  };

  return (
    <div className="contactanos-container">
      <div className="contact-header">
        <h1>📞 Contáctanos</h1>
        <p>Estamos aquí para ayudarte con todas tus consultas</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <h3>📍 Ubicación</h3>
            <p>Av. Principal 123<br />Buenos Aires, Argentina</p>
          </div>
          
          <div className="info-card">
            <h3>📞 Teléfono</h3>
            <p>+54 11 1234-5678</p>
          </div>
          
          <div className="info-card">
            <h3>✉️ Email</h3>
            <p>info@chichos.com</p>
          </div>
          
          <div className="info-card">
            <h3>🕒 Horarios</h3>
            <p>Lunes a Viernes: 9:00 - 18:00<br />
               Sábados: 9:00 - 15:00<br />
               Domingos: Cerrado</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Envíanos un mensaje</h2>
          {enviado ? (
            <div className="success-message">
              <h3>✅ ¡Mensaje enviado!</h3>
              <p>Te responderemos a la brevedad</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={form.email}
                onChange={handleChange}
                required
              />
              
              <input
                type="tel"
                name="telefono"
                placeholder="Tu teléfono (opcional)"
                value={form.telefono}
                onChange={handleChange}
              />
              
              <textarea
                name="mensaje"
                placeholder="¿En qué podemos ayudarte?"
                rows="5"
                value={form.mensaje}
                onChange={handleChange}
                required
              ></textarea>
              
              <button type="submit">Enviar mensaje</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}