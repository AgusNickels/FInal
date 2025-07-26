import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { TiendaChichosRoute } from './routes/TiendaChichos.js';
import TiendaChichosModel from './models/mysql/TiendaChichos.js';

dotenv.config();

export function createApp() {
  const app = express();
  const PORT = process.env.PORT || 3005;

 
  app.disable('x-powered-by');

  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: "Hola desde Tienda Chichos" });
  });

  app.use('/productos', TiendaChichosRoute(TiendaChichosModel));

  app.use((req, res) => {
    res.status(404).json({ message: '404 - Ruta no encontrada' });
  });

  app.listen(PORT, () => {
    console.log(` Servidor encendido en http://localhost:${PORT}`);
  });

  return app;
}
