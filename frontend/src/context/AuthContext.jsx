import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async ({ mail, password }) => {
    try {
      const res = await fetch("http://localhost:3005/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensaje || "Error de login");

      const { token } = data;
      const decoded = JSON.parse(atob(token.split(".")[1])); // decodifica el payload

      localStorage.setItem("usuario", JSON.stringify(decoded));
      localStorage.setItem("token", token);
      setUser(decoded);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
