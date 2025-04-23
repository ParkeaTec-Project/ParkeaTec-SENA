import express from 'express';
import strikesController from '../controllers/strikesControllers.js';
import authorizeRoles from "../middleware/authorizeRoles.js";
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/registroStrike:
 *   post:
 *     summary: Registrar un nuevo strike
 *     description: Permite registrar un strike para un usuario y un vehículo, y actualizar la novedad asociada.
 *     tags: [Strikes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID del usuario al que se le va a registrar el strike.
 *                 example: 1001
 *               id_vehiculo:
 *                 type: integer
 *                 description: ID del vehículo involucrado en el strike.
 *                 example: 12345
 *               id_reserva:
 *                 type: integer
 *                 description: ID de la reserva asociada al strike (opcional).
 *                 example: 6789
 *               descripcion:
 *                 type: string
 *                 description: Descripción del strike (razón del strike).
 *                 example: "Vehículo estacionado en espacio prohibido."
 *               id_novedad:
 *                 type: integer
 *                 description: ID de la novedad asociada a este strike.
 *                 example: 234
 *     responses:
 *       200:
 *         description: Strike registrado exitosamente y novedad actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Strike registrado y novedad actualizada"
 *                 result:
 *                   type: object
 *                   description: Detalles del strike registrado.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     id_usuario:
 *                       type: integer
 *                       example: 1001
 *                     id_vehiculo:
 *                       type: integer
 *                       example: 12345
 *                     id_vigilante:
 *                       type: integer
 *                       example: 5002
 *                     id_reserva:
 *                       type: integer
 *                       example: 6789
 *                     descripcion:
 *                       type: string
 *                       example: "Vehículo estacionado en espacio prohibido."
 *       400:
 *         description: Error de validación, falta información requerida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Datos incompletos el id_usuario, id_vehiculo, descripcion e id_novedad son requeridos"
 *       500:
 *         description: Error al registrar el strike o actualizar la novedad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al registrar el strike"
 */
router.post('/registroStrike', authenticateToken, authorizeRoles("admin"), strikesController.registarStrike);

/**
 * @swagger
 * /api/registroNovedadStrike:
 *   post:
 *     summary: Registrar una novedad de strike
 *     description: Permite a un vigilante registrar una novedad asociada a un strike.
 *     tags: [Strikes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID del usuario al que se le registra la novedad de strike.
 *                 example: 1001
 *               id_vehiculo:
 *                 type: integer
 *                 description: ID del vehículo relacionado con el strike.
 *                 example: 12345
 *               id_reserva:
 *                 type: integer
 *                 description: ID de la reserva asociada al strike (opcional).
 *                 example: 6789
 *               descripcion:
 *                 type: string
 *                 description: Descripción del strike (razón del strike).
 *                 example: "Vehículo estacionado en espacio prohibido."
 *     responses:
 *       200:
 *         description: Novedad registrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Novedad registrada correctamente"
 *                 result:
 *                   type: object
 *                   description: Detalles de la novedad registrada.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     id_usuario:
 *                       type: integer
 *                       example: 1001
 *                     id_vehiculo:
 *                       type: integer
 *                       example: 12345
 *                     id_vigilante:
 *                       type: integer
 *                       example: 5002
 *                     id_reserva:
 *                       type: integer
 *                       example: 6789
 *                     descripcion:
 *                       type: string
 *                       example: "Vehículo estacionado en espacio prohibido."
 *       400:
 *         description: Error de validación, falta información requerida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Datos incompletos el id_usuario, id_vehiculo y descripcion son requeridos"
 *       500:
 *         description: Error al registrar la novedad de strike.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno al registrar la novedad"
 */
router.post('/registroNovedadStrike', authenticateToken, authorizeRoles("vigilante"), strikesController.registroNovedadStrike);

/**
 * @swagger
 * /api/obtenerNovedades:
 *   get:
 *     summary: Obtener novedades de strike
 *     description: Permite a un vigilante obtener todas las novedades asociadas a los strikes registrados.
 *     tags: [Strikes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Novedades obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "novedades obtenidas"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_novedad:
 *                         type: integer
 *                         example: 2
 *                       id_usuario:
 *                         type: integer
 *                         example: 1000517
 *                       id_vehiculo:
 *                         type: string
 *                         example: "YYY123"
 *                       id_vigilante:
 *                         type: integer
 *                         example: 15987
 *                       id_reserva:
 *                         type: integer
 *                         example: 44
 *                       fecha_strike:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T14:32:30.000Z"
 *                       descripcion:
 *                         type: string
 *                         example: "tiempo limite en el uso del parqueadero"
 *                       estado:
 *                         type: string
 *                         example: "rechazado"
 *                       id_admin_revisor:
 *                         type: integer
 *                         nullable: true
 *                         example: null
 *                       nombre_usuario:
 *                         type: string
 *                         example: "juan"
 *                       placa_vehiculo:
 *                         type: string
 *                         example: "YYY123"
 *       404:
 *         description: No se encontraron novedades para el vigilante.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron novedades"
 *       500:
 *         description: Error interno al obtener las novedades.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.get('/obtenerNovedades', authenticateToken, authorizeRoles("vigilante"), strikesController.obtenerNovedadesStrike);

/**
 * @swagger
 * /api/verNovedadesAdmin:
 *   get:
 *     summary: Ver todas las novedades de strike para el administrador
 *     description: Permite a un administrador obtener todas las novedades asociadas a los strikes registrados.
 *     tags: [Strikes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Novedades obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "novedades obtenidas"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_novedad:
 *                         type: integer
 *                         example: 1
 *                       id_usuario:
 *                         type: integer
 *                         example: 1000517
 *                       id_vehiculo:
 *                         type: string
 *                         example: "YYY123"
 *                       id_vigilante:
 *                         type: integer
 *                         example: 15987
 *                       id_reserva:
 *                         type: integer
 *                         example: 43
 *                       fecha_strike:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T13:27:32.000Z"
 *                       descripcion:
 *                         type: string
 *                         example: "esta ocupando dos espacios"
 *                       estado:
 *                         type: string
 *                         example: "aprobado"
 *                       id_admin_revisor:
 *                         type: integer
 *                         nullable: true
 *                         example: null
 *       404:
 *         description: No se encontraron novedades.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron novedades"
 *       500:
 *         description: Error interno al obtener las novedades.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.get('/verNovedadesAdmin', authenticateToken, authorizeRoles("admin"), strikesController.verNovedades);

/**
 * @swagger
 * /api/rechazarNovedad:
 *   put:
 *     summary: Rechazar una novedad de strike
 *     description: Permite a un administrador rechazar una novedad registrada para un strike.
 *     tags: [Strikes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_novedad:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Novedad rechazada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "novedad rechazada"
 *       400:
 *         description: Datos incompletos, se necesita el `id_novedad`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Datos incompletos se necesita id_novedad"
 *       500:
 *         description: Error interno al rechazar la novedad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al rechazar la novedad"
 */
router.put('/rechazarNovedad', authenticateToken, authorizeRoles("admin"), strikesController.rechazarNovedad);

/**
 * @swagger
 * /api/strikesUsuario/{id_usuario}:
 *   get:
 *     summary: Obtener strikes de un usuario
 *     description: Retorna la lista de strikes registrados para un usuario específico.
 *     tags: [Strikes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_usuario
 *         in: path
 *         required: true
 *         description: ID del usuario del que se desea obtener los strikes.
 *         schema:
 *           type: integer
 *           example: 1000517
 *     responses:
 *       200:
 *         description: Lista de strikes obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "strikes obtenidos"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_strike:
 *                         type: integer
 *                         example: 3
 *                       id_usuario:
 *                         type: integer
 *                         example: 1000517
 *                       id_vehiculo:
 *                         type: string
 *                         example: "YYY123"
 *                       id_vigilante:
 *                         type: integer
 *                         example: 78884
 *                       id_reserva:
 *                         type: integer
 *                         example: 43
 *                       fecha_strike:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T13:21:23.000Z"
 *                       descripcion:
 *                         type: string
 *                         example: "mal estacionado"
 *       404:
 *         description: No se encontraron strikes para el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron strikes"
 *       500:
 *         description: Error interno del servidor al obtener los strikes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.get('/strikesUsuario/:id_usuario', authenticateToken, strikesController.obtenerStrikesUsuario);
export default router;