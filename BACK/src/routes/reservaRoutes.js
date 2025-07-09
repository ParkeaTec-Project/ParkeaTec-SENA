import express from 'express';
import reservaController from '../controllers/reservaController.js';

const router = express.Router();

/**
 * @swagger
 * /api/crearReserva:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una reserva para un vehículo en un espacio del parqueadero si está disponible.
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_creacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación de la reserva.
 *                 example: "2025-04-23"
 *               estado:
 *                 type: string
 *                 description: Estado de la reserva.
 *                 example: "pendiente"
 *               fecha_hora_entrada:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de entrada.
 *                 example: "2025-04-23T08:00:00"
 *               fecha_hora_salida:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de salida.
 *                 example: "2025-04-23T12:00:00"
 *               puesto_asignado:
 *                 type: integer
 *                 description: ID del espacio asignado.
 *                 example: 5
 *               id_documento:
 *                 type: integer
 *                 description: ID del documento del usuario.
 *                 example: 1012345678
 *               vehiculo_placa:
 *                 type: string
 *                 description: Placa del vehículo.
 *                 example: "ABC123"
 *     responses:
 *       200:
 *         description: Reserva creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva creada"
 *                 result:
 *                   type: object
 *                   description: Información de la reserva creada.
 *       400:
 *         description: Error en la solicitud. Campos faltantes, puesto ocupado o vehículo con reserva activa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El puesto ya esta ocupado"
 *       500:
 *         description: Error interno al crear la reserva.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear la reserva"
 */
router.post('/crearReserva', reservaController.crearReserva);

/**
 * @swagger
 * /api/verificarReserva/{id}:
 *   get:
 *     summary: Verificar si un usuario tiene una reserva activa o pendiente
 *     description: Revisa si el usuario con el ID de documento proporcionado ya tiene una reserva activa o pendiente.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento del usuario.
 *         schema:
 *           type: integer
 *           example: 1012345678
 *     responses:
 *       200:
 *         description: El usuario no tiene reservas activas y puede reservar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes reservas activas. Puedes reservar"
 *       400:
 *         description: El usuario ya tiene una reserva activa o pendiente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ya tienen una reserva activa o pendiente"
 *       500:
 *         description: Error interno del servidor al verificar la reserva.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno en el servidor"
 */
router.get('/verificarReserva/:id', reservaController.verificarReserva);

/**
 * @swagger
 * /api/obtenerReservas/{id}:
 *   get:
 *     summary: Obtener reservas de un usuario
 *     description: Devuelve todas las reservas asociadas al ID del documento proporcionado.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento del usuario.
 *         schema:
 *           type: integer
 *           example: 1000517
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservas obtenidas"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_reserva:
 *                         type: integer
 *                         example: 24
 *                       numero_espacio:
 *                         type: string
 *                         example: "B1"
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-10T05:00:00.000Z"
 *                       estado:
 *                         type: string
 *                         example: "cancelada"
 *                       fecha_hora_entrada:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-10T05:00:00.000Z"
 *                       fecha_hora_salida:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-10T07:24:31.000Z"
 *                       id_documento:
 *                         type: integer
 *                         example: 1000517
 *                       vehiculo_placa:
 *                         type: string
 *                         example: "YYY123"
 *       400:
 *         description: El usuario no tiene reservas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes reservas"
 *       500:
 *         description: Error interno del servidor al obtener las reservas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno en el servidor"
 */
router.get('/obtenerReservas/:id', reservaController.obtenerReservas);

/**
 * @swagger
 * /api/obtenerReservaActiva/{id}:
 *   get:
 *     summary: Obtener reserva activa de un usuario
 *     description: Retorna la reserva activa (si existe) de un usuario identificado por su número de documento.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento del usuario.
 *         schema:
 *           type: integer
 *           example: 1000517
 *     responses:
 *       200:
 *         description: Reserva activa obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva activa obtenida"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_reserva:
 *                         type: integer
 *                         example: 45
 *                       numero_espacio:
 *                         type: string
 *                         example: "A1"
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T20:52:25.000Z"
 *                       estado:
 *                         type: string
 *                         example: "pendiente"
 *                       fecha_hora_entrada:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       fecha_hora_salida:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       id_documento:
 *                         type: integer
 *                         example: 1000517
 *                       vehiculo_placa:
 *                         type: string
 *                         example: "YYY123"
 *       400:
 *         description: No hay reservas activas para el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes reserva activas"
 *       500:
 *         description: Error interno del servidor al obtener la reserva activa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno en el servidor"
 */
router.get('/obtenerReservaActiva/:id', reservaController.obtenerReservaActiva);

/**
 * @swagger
 * /api/cancelarReserva/{id}:
 *   put:
 *     summary: Cancelar una reserva
 *     description: Cancela una reserva activa por su ID y actualiza el estado del espacio correspondiente.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a cancelar.
 *         schema:
 *           type: integer
 *           example: 45
 *     responses:
 *       200:
 *         description: Reserva cancelada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva cancelada"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_reserva:
 *                       type: integer
 *                       example: 45
 *                     id_parqueadero:
 *                       type: string
 *                       example: "A1"
 *       400:
 *         description: Petición mal formada (falta ID o ID inválido).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falta id de la reserva"
 *       404:
 *         description: La reserva no fue encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontro una reserva con el ID especificado"
 *       500:
 *         description: Error interno al intentar cancelar la reserva.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.put('/cancelarReserva/:id', reservaController.cancelarReserva);

/**
 * @swagger
 * /api/aceptarReserva/{id}:
 *   put:
 *     summary: Aceptar una reserva
 *     description: Acepta una reserva pendiente y actualiza su estado y el del espacio correspondiente.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a aceptar.
 *         schema:
 *           type: integer
 *           example: 45
 *     responses:
 *       200:
 *         description: Reserva aceptada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva aceptada"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_reserva:
 *                       type: integer
 *                       example: 45
 *                     id_parqueadero:
 *                       type: string
 *                       example: "A1"
 *       400:
 *         description: Petición mal formada (falta ID o ID inválido).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falta id de la reserva"
 *       404:
 *         description: La reserva no fue encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontro ninguna reserva con el ID especificado"
 *       500:
 *         description: Error interno al intentar aceptar la reserva.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.put('/aceptarReserva/:id', reservaController.aceptarReserva);

/**
 * @swagger
 * /api/finalizarReserva/{id}:
 *   put:
 *     summary: Finalizar una reserva
 *     description: Finaliza una reserva activa, actualiza su estado y libera el espacio del parqueadero.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a finalizar.
 *         schema:
 *           type: integer
 *           example: 45
 *     responses:
 *       200:
 *         description: Reserva finalizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva finalizada"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_reserva:
 *                       type: integer
 *                       example: 45
 *                     id_parqueadero:
 *                       type: string
 *                       example: "A1"
 *       400:
 *         description: Petición mal formada (falta ID o ID inválido).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falta id de la reserva"
 *       404:
 *         description: La reserva no fue encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontro una reserva con el ID especificado"
 *       500:
 *         description: Error interno al intentar finalizar la reserva.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.put('/finalizarReserva/:id', reservaController.finalizarReserva);

/**
 * @swagger
 * /api/obtenerReservaEspacio/{id}:
 *   get:
 *     summary: Obtener la reserva activa asociada a un espacio
 *     description: Retorna los detalles de la reserva asociada al espacio con el ID proporcionado.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del espacio.
 *         schema:
 *           type: integer
 *           example: 14
 *     responses:
 *       200:
 *         description: Reserva encontrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "reserva de espacio obtenida"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_reserva:
 *                         type: integer
 *                         example: 44
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T19:28:15.000Z"
 *                       estado:
 *                         type: string
 *                         example: "aceptada"
 *                       fecha_hora_entrada:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2025-04-23T14:31:07.000Z"
 *                       fecha_hora_salida:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: null
 *                       puesto_asignado:
 *                         type: string
 *                         example: "14"
 *                       id_documento:
 *                         type: integer
 *                         example: 1000517
 *                       vehiculo_placa:
 *                         type: string
 *                         example: "YYY123"
 *                       tipo_parqueadero:
 *                         type: string
 *                         example: "Moto"
 *       404:
 *         description: No se encontró ninguna reserva para el espacio indicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontro una reserva para el espacio indicado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.get('/obtenerReservaEspacio/:id', reservaController.obtenerReservaEspacio);


router.get('/historialUsuario/:id', reservaController.historialUsuario);



router.get('/reservaActual/:id', reservaController.reservaActual);

router.get('/reservasDiarias', reservaController.reservasDiarias);

router.get('/tipoVehiculo', reservaController.tipoVehiculo);

router.get('/obtenerPuestosUsados', reservaController.obtenerPuestoUsados);

router.get('/usuariosFrecuentes', reservaController.usuariosFrecuentes);

export default router;