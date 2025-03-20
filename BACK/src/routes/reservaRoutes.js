import express from 'express';
import reservaController from '../controllers/reservaController.js';

const router = express.Router();

router.post('/crearReserva', reservaController.crearReserva);

export default router;