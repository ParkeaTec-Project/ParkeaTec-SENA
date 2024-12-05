import express from 'express';
import userController from '../controllers/userController.js';
import autenticacion from '../middleware/autenticacion.js'
import upload from '../middleware/upload.js';

const router = express.Router();

//const upload = multer({ storage: storage });

router.post('/userLogin', userController.login); //
router.get('/users', autenticacion, userController.obtenerUsuarios); //
router.get('/user/:id', userController.obtenerUsuarioId); //
router.post('/user', userController.crearUsuarios); 
router.post('/registro', upload, userController.registroUsuario);
router.put('/userUpdate/:id', userController.actualizarUsuarioId);
router.delete('/userDelete/:id', userController.borrarUsuarioId);
router.post('/cerrarSesion', userController.cerrarSesion);
router.get('/verificarSesion', userController.checkSession);


export default router;