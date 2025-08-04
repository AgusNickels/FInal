import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ mail: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/admin");
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <section style={{ maxWidth: "400px", margin: "50px auto", background: "white", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="mail"
          placeholder="Correo electrónico"
          value={formData.mail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}

export default Login;
