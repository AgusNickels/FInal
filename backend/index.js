import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { TiendaChichosRoute } from './routes/TiendaChichos.js';
import { CategoriasRoute } from './routes/categorias.js';
import { CategoriasController } from './controllers/categorias.js';
import usuariosRoutes from './routes/Usuarios.js';
import TiendaChichosModel from './models/mysql/TiendaChichos.js';
import CategoriasModel from './models/mysql/categorias.js';

dotenv.config();

export function createApp(tiendaChichosModel = TiendaChichosModel) {
  const app = express();
  const categoriasController = new CategoriasController(CategoriasModel);

  app.disable('x-powered-by');

  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json());

  // RUTA TEMPORAL PARA VER USUARIOS - BORRAR EN PRODUCCIÓN
  app.get('/usuarios/debug', async (req, res) => {
    try {
      // Importar la función del controlador
      const { obtenerUsuarios } = await import('./controllers/Usuarios.js');
      
      // Crear objetos req y res simulados
      const mockReq = {};
      const mockRes = {
        json: (data) => res.json(data),
        status: (code) => ({
          json: (data) => res.status(code).json(data)
        })
      };
      
      // Llamar a la función del controlador
      await obtenerUsuarios(mockReq, mockRes);
      
    } catch (error) {
      res.status(500).json({ 
        error: "Error al obtener usuarios",
        detalle: error.message
      });
    }
  });

  app.use('/usuarios', usuariosRoutes);

  app.get('/', (req, res) => {
    res.json({ message: "Hola desde Tienda Chichos" });
  });

  app.use('/productos', TiendaChichosRoute(tiendaChichosModel));
  app.use('/categorias', CategoriasRoute(categoriasController));

  app.use((req, res) => {
    res.status(404).json({ message: '404 - Ruta no encontrada' });
  });

  return app;
}