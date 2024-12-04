import express from 'express';
import userController from '../controllers/userController.js';
import autenticacion from '../middleware/autenticacion.js'

const router = express.Router();

router.post('/userLogin', userController.login); //
router.get('/users', autenticacion, userController.obtenerUsuarios); //
router.get('/user/:id', userController.obtenerUsuarioId); //
router.post('/user', userController.crearUsuarios); 
router.put('/userUpdate/:id', userController.actualizarUsuarioId);
router.delete('/userDelete/:id', userController.borrarUsuarioId);
router.post('/cerrarSesion', userController.cerrarSesion);
router.get('/verificarSesion', userController.checkSession);


export default router;