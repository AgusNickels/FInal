import express from 'express';
import { loginUsuario, registrarUsuario, obtenerUsuarios} from '../controllers/Usuarios.js';

import { verificarToken, verificarAdmin } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/login', loginUsuario);
router.post('/register', registrarUsuario);

// Solo para usuarios logueados Y administradores
router.get('/', verificarToken, verificarAdmin, obtenerUsuarios);

export default router;
