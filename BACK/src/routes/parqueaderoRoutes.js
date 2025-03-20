import express from 'express';
import parqueaderoController from '../controllers/parqueaderoController.js';

const router = express.Router();

router.get('/espacios', parqueaderoController.obtenerEspacios);

export default router;