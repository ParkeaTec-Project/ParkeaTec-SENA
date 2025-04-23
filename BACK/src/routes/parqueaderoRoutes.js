import express from 'express';
import parqueaderoController from '../controllers/parqueaderoController.js';

const router = express.Router();

/**
 * @swagger
 * /api/espacios:
 *   get:
 *     summary: Obtener todos los espacios del parqueadero
 *     description: Retorna una lista de los espacios disponibles en el parqueadero.
 *     tags: [Parqueadero]
 *     responses:
 *       200:
 *         description: Lista de espacios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del espacio.
 *                     example: 1
 *                   numero:
 *                     type: string
 *                     description: Número del espacio.
 *                     example: "A-01"
 *                   disponible:
 *                     type: boolean
 *                     description: Estado de disponibilidad del espacio.
 *                     example: true
 *       404:
 *         description: No existen espacios en el parqueadero.
 *       500:
 *         description: Error al obtener los espacios.
 */
router.get('/espacios', parqueaderoController.obtenerEspacios);

export default router;