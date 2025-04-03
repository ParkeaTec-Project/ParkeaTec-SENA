import express from 'express';
import vehiculoController from '../controllers/vehiculoController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/registroVehiculo:
 *   post:
 *     summary: Registrar un vehículo
 *     description: Permite registrar un vehículo con sus datos y documentos adjuntos.
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *                 example: "ABC123"
 *               tipo_vehiculo:
 *                 type: string
 *                 example: "Automóvil"
 *               modelo:
 *                 type: string
 *                 example: "2022"
 *               marca:
 *                 type: string
 *                 example: "Toyota"
 *               color:
 *                 type: string
 *                 example: "Rojo"
 *               vencimiento_soat:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *               observacion:
 *                 type: string
 *                 example: "Vehículo en buen estado"
 *               id_documento:
 *                 type: integer
 *                 example: 12345
 *               id_tipo_vehiculo:
 *                 type: integer
 *                 example: 2
 *               foto_placa_vehiculo:
 *                 type: string
 *                 format: binary
 *               foto_serial:
 *                 type: string
 *                 format: binary
 *               foto_vehiculo:
 *                 type: string
 *                 format: binary
 *               foto_licencia_conducir:
 *                 type: string
 *                 format: binary
 *               foto_tarjeta_propiedad:
 *                 type: string
 *                 format: binary
 *               foto_soat:
 *                 type: string
 *                 format: binary
 *               foto_tecnomecanica:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Registro exitoso del vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro exitoso"
 *                 data:
 *                   type: object
 *                   example: { "insertId": 1 }
 *       400:
 *         description: Faltan campos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan campos requeridos"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al registrar formulario"
 */
router.post('/registroVehiculo', upload('vehiculo'), vehiculoController.registroVehiculo);

/**
 * @swagger
 * /api/verVehiculo/{id}:
 *   get:
 *     summary: Obtener información de un vehículo por ID
 *     description: Obtiene los detalles de un vehículo registrado en el sistema a partir de su ID.
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vehículo a consultar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Información del vehículo obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: {
 *                     "id": 1,
 *                     "placa": "ABC123",
 *                     "tipo_vehiculo": "Automóvil",
 *                     "modelo": "2022",
 *                     "marca": "Toyota",
 *                     "color": "Rojo",
 *                     "vencimiento_soat": "2025-06-15"
 *                   }
 *       400:
 *         description: ID de usuario inválido o faltante.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Id de usuario invalido"
 *       404:
 *         description: Vehículo no encontrado para el ID especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "vehiculo de usuario no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.get('/verVehiculo/:id', vehiculoController.obtenerVehiculoId);

/**
 * @swagger
 * /api/updateVehiculo/{id}:
 *   put:
 *     summary: Actualizar información de un vehículo
 *     description: Permite actualizar el color, observación y foto de un vehículo registrado en el sistema.
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vehículo a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *                 example: "Azul"
 *               observacion:
 *                 type: string
 *                 example: "Pequeño rayón en la puerta"
 *               foto_vehiculo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Vehículo actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehiculo actualizado correctamente"
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Faltan datos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falta informacion requerida"
 *       404:
 *         description: Vehículo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehiculo no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en actualizar el vehiculo"
 */
router.put('/updateVehiculo/:id', upload('vehiculoSingle'), vehiculoController.actualizarVehiculoId);

export default router;