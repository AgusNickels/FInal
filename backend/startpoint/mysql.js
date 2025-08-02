import { createApp } from '../index.js';
import TiendaChichosModel from '../models/mysql/TiendaChichos.js';

const app = createApp(TiendaChichosModel);
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Servidor conectado en http://localhost:${PORT}`);
});
