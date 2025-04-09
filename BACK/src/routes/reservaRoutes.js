import express from 'express';
import reservaController from '../controllers/reservaController.js';

const router = express.Router();

router.post('/crearReserva', reservaController.crearReserva);
router.get('/verificarReserva/:id', reservaController.verificarReserva);
router.delete('/cancelarReserva/:id', reservaController.cancelarReserva);

export default router;