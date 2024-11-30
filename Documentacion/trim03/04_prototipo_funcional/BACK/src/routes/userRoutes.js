import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/userLogin', userController.login); //
router.get('/users', userController.obtenerUsuarios); //
router.get('/user/:id', userController.obtenerUsuarioId); //
router.post('/user', userController.crearUsuarios); 
router.put('/userUpdate/:id', userController.actualizarUsuarioId);
router.delete('/userDelete/:id', userController.borrarUsuarioId);


export default router;