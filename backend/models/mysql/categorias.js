import { db } from '../../config/db.js';

const CategoriasModel = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM categorias ORDER BY nombre');
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  }
};

export default CategoriasModel;
