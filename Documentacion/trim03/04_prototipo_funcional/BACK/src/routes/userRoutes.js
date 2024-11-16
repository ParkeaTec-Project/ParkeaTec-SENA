import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', userController.obtenerUsuarios);
router.post('/user', userController.crearUsuarios);


export default router;