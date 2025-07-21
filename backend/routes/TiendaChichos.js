import { Router } from "express";

export function TiendaChichosRoute(TiendaChichosModel) {
    const router = Router();
    

    router.get('/', async (req, res) => {
        try {
            const { nombre, categoria_id, precio_lista } = req.query;
            

            if (nombre || categoria_id || precio_lista) {
                const filtros = {};
                if (nombre) filtros.nombre = nombre;
                if (categoria_id) filtros.categoria_id = parseInt(categoria_id);
                if (precio_lista) filtros.precio_lista = parseFloat(precio_lista);
                
                const result = await TiendaChichosModel.GetTiendaChichosForFilter(filtros);
                res.json(result);
            } else {
                const result = await TiendaChichosModel.GetTiendaChichos();
                res.json(result);
            }
        } catch (error) {
            console.error('Error en GET /productos:', error);
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    });


    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await TiendaChichosModel.GetTiendaChichosForID(parseInt(id));
            
            if (!result || result.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            
            res.json(result[0]); // Devolver el primer resultado
        } catch (error) {
            console.error('Error en GET /productos/:id:', error);
            res.status(500).json({ message: 'Error al obtener producto', error: error.message });
        }
    });


    router.post('/', async (req, res) => {
        try {
            const { 
                nombre, 
                descripcion, 
                precio_lista, 
                precio_efectivo, 
                stock, 
                imagen_url, 
                categoria_id 
            } = req.body;
            
            // Validaciones básicas
            if (!nombre || !descripcion || !precio_lista || !categoria_id || stock === undefined) {
                return res.status(400).json({ 
                    message: 'Faltan campos obligatorios: nombre, descripcion, precio_lista, categoria_id, stock' 
                });
            }

            const data = { 
                nombre, 
                descripcion, 
                precio_lista: parseFloat(precio_lista), 
                precio_efectivo: precio_efectivo ? parseFloat(precio_efectivo) : null,
                stock: parseInt(stock),
                imagen_url: imagen_url || null,
                categoria_id: parseInt(categoria_id)
            };

            const result = await TiendaChichosModel.CreateProduct(data);
            
            res.status(201).json({ 
                message: 'Producto creado exitosamente', 
                id: result.insertId,
                producto: data
            });
        } catch (error) {
            console.error('Error en POST /productos:', error);
            res.status(500).json({ message: 'Error al crear producto', error: error.message });
        }
    });


    router.put('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { 
                nombre, 
                descripcion, 
                precio_lista, 
                precio_efectivo, 
                stock, 
                imagen_url, 
                categoria_id 
            } = req.body;
            
            // Validaciones
            if (!nombre || !descripcion || !precio_lista || !categoria_id || stock === undefined) {
                return res.status(400).json({ 
                    message: 'Faltan campos obligatorios para reemplazo completo' 
                });
            }

            const data = { 
                nombre, 
                descripcion, 
                precio_lista: parseFloat(precio_lista), 
                precio_efectivo: precio_efectivo ? parseFloat(precio_efectivo) : null,
                stock: parseInt(stock),
                imagen_url: imagen_url || null,
                categoria_id: parseInt(categoria_id)
            };

            const result = await TiendaChichosModel.ReplaceProduct(data, parseInt(id));
            
            res.json({ message: 'Producto reemplazado exitosamente', result });
        } catch (error) {
            console.error('Error en PUT /productos/:id:', error);
            res.status(500).json({ message: 'Error al reemplazar producto', error: error.message });
        }
    });


    router.patch('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const data = { ...req.body };
            
            // Convertir tipos si existen
            if (data.precio_lista) data.precio_lista = parseFloat(data.precio_lista);
            if (data.precio_efectivo) data.precio_efectivo = parseFloat(data.precio_efectivo);
            if (data.stock !== undefined) data.stock = parseInt(data.stock);
            if (data.categoria_id) data.categoria_id = parseInt(data.categoria_id);
            
            const result = await TiendaChichosModel.UpdateProduct(data, parseInt(id));
            
            res.json({ message: 'Producto actualizado exitosamente', result });
        } catch (error) {
            console.error('Error en PATCH /productos/:id:', error);
            res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
        }
    });


    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await TiendaChichosModel.DeleteProduct(parseInt(id));
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            
            res.json({ message: 'Producto eliminado exitosamente', result });
        } catch (error) {
            console.error('Error en DELETE /productos/:id:', error);
            res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
        }
    });

    return router;
}