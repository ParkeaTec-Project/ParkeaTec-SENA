import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', userController.obtenerUsuarios);


export default router;