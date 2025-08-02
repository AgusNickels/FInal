import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_chichos';

// 🔑 LOGIN
export const loginUsuario = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM usuarios WHERE mail = ?',
      [mail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        name: usuario.name,
        mail: usuario.mail,
        type: usuario.type
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
  }
};

// 📝 REGISTRO con hash
export const registrarUsuario = async (req, res) => {
  const { name, mail, password, type = 'user' } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      'INSERT INTO usuarios (name, mail, password, type) VALUES (?, ?, ?, ?)',
      [name, mail, hashedPassword, type]
    );

    res.status(201).json({ mensaje: 'Usuario registrado', id: result.insertId });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
  }
};

// 👥 GET usuarios (solo info básica)
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await connection.execute(
      'SELECT id, name, mail, type FROM usuarios'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
  }
};
