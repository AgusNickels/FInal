import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

const connection = await mysql.createConnection(config);

export default class TiendaChichos {

  static async GetTiendaChichos() {
    try {
      const [result] = await connection.query('SELECT * FROM productos');
      return result;
    } catch (error) {
      console.error('Error en GetTiendaChichos:', error);
      throw error;
    }
  }

  static async GetTiendaChichosForID(id) {
    try {
      const [result] = await connection.query('SELECT * FROM productos WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error('Error en GetTiendaChichosForID:', error);
      throw error;
    }
  }

  static async GetTiendaChichosForFilter(filter) {
    try {
      let query = 'SELECT * FROM productos WHERE 1=1';
      const values = [];

      if (filter.nombre) {
        query += ' AND nombre LIKE ?';
        values.push(`%${filter.nombre}%`);
      }

      if (filter.categoria_id) {
        query += ' AND categoria_id = ?';
        values.push(filter.categoria_id);
      }

      if (filter.precio_lista) {
        query += ' AND precio_lista <= ?';
        values.push(parseFloat(filter.precio_lista));
      }

      const [result] = await connection.query(query, values);
      return result;
    } catch (error) {
      console.error('Error en GetTiendaChichosForFilter:', error);
      throw error;
    }
  }

  static async CreateProduct(data) {
    try {
      const {
        nombre,
        descripcion,
        precio_lista,
        precio_efectivo,
        stock,
        imagen_url,
        categoria_id
      } = data;

      const [result] = await connection.query(
        `INSERT INTO productos 
        (nombre, descripcion, precio_lista, precio_efectivo, stock, imagen_url, categoria_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nombre, descripcion, precio_lista, precio_efectivo, stock, imagen_url, categoria_id]
      );

      return result;
    } catch (error) {
      console.error('Error en CreateProduct:', error);
      throw error;
    }
  }

  static async ReplaceProduct(data, id) {
    try {
      const {
        nombre,
        descripcion,
        precio_lista,
        precio_efectivo,
        stock,
        imagen_url,
        categoria_id
      } = data;

      const [result] = await connection.query(
        `UPDATE productos SET 
          nombre = ?, 
          descripcion = ?, 
          precio_lista = ?, 
          precio_efectivo = ?, 
          stock = ?, 
          imagen_url = ?, 
          categoria_id = ?
        WHERE id = ?`,
        [nombre, descripcion, precio_lista, precio_efectivo, stock, imagen_url, categoria_id, id]
      );

      return result;
    } catch (error) {
      console.error('Error en ReplaceProduct:', error);
      throw error;
    }
  }

  static async UpdateProduct(data, id) {
    try {
      const fields = [];
      const values = [];

      Object.entries(data).forEach(([key, value]) => {
        fields.push(`${key} = ?`);
        values.push(value);
      });

      values.push(id);

      const query = `UPDATE productos SET ${fields.join(', ')} WHERE id = ?`;
      const [result] = await connection.query(query, values);
      return result;
    } catch (error) {
      console.error('Error en UpdateProduct:', error);
      throw error;
    }
  }

  static async DeleteProduct(id) {
    try {
      const [result] = await connection.query('DELETE FROM productos WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error('Error en DeleteProduct:', error);
      throw error;
    }
  }

  static async DeleteProductForFilter(filter) {
    try {
      let query = 'DELETE FROM productos WHERE 1=1';
      const values = [];

      if (filter.categoria_id) {
        query += ' AND categoria_id = ?';
        values.push(filter.categoria_id);
      }

      if (filter.precio_lista) {
        query += ' AND precio_lista <= ?';
        values.push(parseFloat(filter.precio_lista));
      }

      const [result] = await connection.query(query, values);
      return result;
    } catch (error) {
      console.error('Error en DeleteProductForFilter:', error);
      throw error;
    }
  }
}
