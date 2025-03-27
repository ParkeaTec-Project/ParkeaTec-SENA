import express from 'express';
import userController from '../controllers/userController.js';
import autenticacionUser from '../middleware/autenticacionUser.js';
import autenticacion from '../middleware/autenticacion.js';
import authenticateToken from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

//const upload = multer({ storage: storage });

router.post('/login', userController.login); //
router.get('/auth', authenticateToken, userController.protectedRoute);
router.get('/users', authenticateToken, userController.obtenerUsuarios); //
router.get('/user/:id', userController.obtenerUsuarioId); //
router.post('/user', upload('single'), userController.crearUsuarios); 
router.post('/registro', upload('multiple'), userController.registroUsuario);
router.put('/userUpdate/:id', userController.actualizarUsuarioId);
router.delete('/userDelete/:id', userController.borrarUsuarioId);
router.delete('/userDelete', autenticacion, userController.borrarUsuarioId);
router.post('/cerrarSesion', userController.cerrarSesion);
router.get('/verificarSesion', authenticateToken, userController.verificarAutenticacion);


export default router;