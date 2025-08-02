import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'notemetasdondenotecorresponda123456';

// 🛡 Verifica si el token es válido
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }

    req.usuario = usuario; // Guarda info del usuario en la request
    next();
  });
};

// 🔒 Verifica si el usuario es administrador
export const verificarAdmin = (req, res, next) => {
  if (req.usuario?.type !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso restringido a administradores' });
  }

  next();
};
