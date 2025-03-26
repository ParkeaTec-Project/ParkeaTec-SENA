import express from 'express';
import userController from '../controllers/userController.js';
import autenticacionUser from '../middleware/autenticacionUser.js';
import autenticacion from '../middleware/autenticacion.js';
import upload from '../middleware/upload.js';

const router = express.Router();

//const upload = multer({ storage: storage });

router.post('/userLogin', userController.login); //
router.get('/users', autenticacionUser, userController.obtenerUsuarios); //
router.get('/user/:id', userController.obtenerUsuarioId); //
router.post('/user', upload('single'), userController.crearUsuarios); 
router.post('/registro', upload('multiple'), userController.registroUsuario);
router.put('/userUpdate/:id', userController.actualizarUsuarioId);
router.delete('/userDelete/:id', userController.borrarUsuarioId);
router.delete('/userDelete', autenticacion, userController.borrarUsuarioId);
router.post('/cerrarSesion', userController.cerrarSesion);
router.get('/verificarSesion', userController.checkSession);


export default router;