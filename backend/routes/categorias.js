import { Router } from "express";

export function CategoriasRoute(controller) {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const categorias = await controller.getAll();
      res.json(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ message: 'Error interno', error: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const categoria = await controller.getById(parseInt(req.params.id));
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(categoria);
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      res.status(500).json({ message: 'Error interno', error: error.message });
    }
  });

  return router;
}
