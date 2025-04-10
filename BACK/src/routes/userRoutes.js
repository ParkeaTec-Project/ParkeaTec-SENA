import express from "express";
import userController from "../controllers/userController.js";
// import autenticacionUser from "../middleware/autenticacionUser.js";
// import autenticacion from "../middleware/autenticacion.js";
import authenticateToken from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

//const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Autentica un usuario con su correo y contraseña.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "usuario@ejemplo.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado.
 *                   example: "abc123.xyz456"
 *       400:
 *         description: Error en la solicitud (datos faltantes o incorrectos).
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/login", userController.login);

router.get("/auth", authenticateToken, userController.protectedRoute);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener usuarios
 *     description: Obtiene una lista de todos los usuarios.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id_documento:
 *                  type: integer
 *                  description: Identificador de documento del usuario
 *                  example: 0
 *                nombre:
 *                  type: string
 *                  description: Nombre del usuario
 *                  example: "Juan"
 *                apellido:
 *                  type: string
 *                  description: Apellido del usuario
 *                  example: "G"
 *                telefono:
 *                  type: integer
 *                  description: Numero de telefono del usuario
 *                  example: 5455
 *                direccion:
 *                  type: string
 *                  description: Direccion del usuario
 *                  example: "Bogota"
 *                correo_electronico:
 *                  type: string
 *                  description: Correo electronico del usuario
 *                  example: "juan@gmail.com"
 *                contraseña:
 *                  type: string
 *                  description: Contraseña encriptada del usuario
 *                  example: "$2b$10$J1pkMQQFv6EY/tDlcP/gVuE59AyL8G2cd5xXP1./GLmSzud2FykeS"
 *                foto_usuario:
 *                  type: string
 *                  description: URL de la foto del usuario
 *                  example: "uploads/1733693158012-563285032.jpg"
 *                firma_usuario:
 *                  type: string
 *                  description: Firma digital del usuario
 *                  example: "uploads/1733693158082-563285032.jpg"
 *                foto_documento:
 *                  type: string
 *                  description: Imagen del documento
 *                  example: "uploads/1733693158012-563285047.jpg"
 *                foto_carnet:
 *                  type: string
 *                  description: Imagen del carnet del usuario
 *                  example: "uploads/1733693158012-563265032.jpg"
 *                rol:
 *                  type: string
 *                  description: Rol del usuario
 *                  example: "Usuario"
 *                nombre_documento:
 *                  type: string
 *                  description: Tipo de documento del usuario
 *                  example: "Cedula de ciudadania"
 *       404:
 *         description: No existen usuarios en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No existen usuarios"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los usuarios"
 */
router.get("/users", authenticateToken, userController.obtenerUsuarios); //

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtener usuario
 *     description: Obtiene una lista del usuario.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id_documento:
 *                  type: integer
 *                  description: Identificador de documento del usuario
 *                  example: 0
 *                nombre:
 *                  type: string
 *                  description: Nombre del usuario
 *                  example: "Juan"
 *                apellido:
 *                  type: string
 *                  description: Apellido del usuario
 *                  example: "G"
 *                telefono:
 *                  type: integer
 *                  description: Numero de telefono del usuario
 *                  example: 5455
 *                direccion:
 *                  type: string
 *                  description: Direccion del usuario
 *                  example: "Bogota"
 *                correo_electronico:
 *                  type: string
 *                  description: Correo electronico del usuario
 *                  example: "juan@example.com"
 *                contraseña:
 *                  type: string
 *                  description: Contraseña encriptada del usuario
 *                  example: "$2b$10$J1pkMQQFv6EY/tDlcP/gVuE59AyL8G2cd5xXP1./GLmSzud2FykeS"
 *                foto_usuario:
 *                  type: string
 *                  description: URL de la foto del usuario
 *                  example: "uploads/1733693158012-563285032.jpg"
 *                firma_usuario:
 *                  type: string
 *                  description: Firma digital del usuario
 *                  example: "uploads/1733693158082-563285032.jpg"
 *                foto_documento:
 *                  type: string
 *                  description: Imagen del documento
 *                  example: "uploads/1733693158012-563285047.jpg"
 *                foto_carnet:
 *                  type: string
 *                  description: Imagen del carnet del usuario
 *                  example: "uploads/1733693158012-563265032.jpg"
 *                rol:
 *                  type: string
 *                  description: Rol del usuario
 *                  example: "Usuario"
 *                nombre_documento:
 *                  type: string
 *                  description: Tipo de documento del usuario
 *                  example: "Cedula de ciudadania"
 *       400:
 *         description: Id de usuario invalido
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado con id 0"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno en el servidor"
 */
router.get("/user/:id", userController.obtenerUsuarioId);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_documento:
 *                 type: integer
 *                 description: Identificador del documento del usuario.
 *                 example: 12345678
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: "Pérez"
 *               telefono:
 *                 type: integer
 *                 description: Número de teléfono del usuario.
 *                 example: 3001234567
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario.
 *                 example: "Calle 123, Bogotá"
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (se almacenará encriptada).
 *                 example: "password123"
 *               centro_formacion:
 *                 type: string
 *                 description: Centro de formación del usuario.
 *                 example: "SENA"
 *               ficha_aprendiz:
 *                 type: string
 *                 description: Ficha de aprendiz del usuario.
 *                 example: "12345"
 *               firma_usuario:
 *                 type: string
 *                 description: Firma digital del usuario.
 *                 example: "uploads/firma.jpg"
 *               foto_documento:
 *                 type: string
 *                 description: Imagen del documento del usuario.
 *                 example: "uploads/documento.jpg"
 *               foto_carnet:
 *                 type: string
 *                 description: Imagen del carnet del usuario.
 *                 example: "uploads/carnet.jpg"
 *               id_tipo_documento:
 *                 type: integer
 *                 description: Tipo de documento del usuario.
 *                 example: 1
 *               rol_id:
 *                 type: integer
 *                 description: ID del rol del usuario.
 *                 example: 2
 *               foto_usuario:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado"
 *       400:
 *         description: Error en la solicitud (datos faltantes o archivo no proporcionado).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No puede estar vacío, carga una imagen"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el usuario"
 */
router.post("/user", upload("usuarioSingle"), userController.crearUsuarios);

/**
 * @swagger
 * /api/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario con los datos y archivos proporcionados.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_documento:
 *                 type: integer
 *                 description: Identificador del documento del usuario.
 *                 example: 12345678
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: "Pérez"
 *               telefono:
 *                 type: integer
 *                 description: Número de teléfono del usuario.
 *                 example: 3001234567
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario.
 *                 example: "Calle 123, Bogotá"
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (se almacenará encriptada).
 *                 example: "password123"
 *               centro_formacion:
 *                 type: string
 *                 description: Centro de formación del usuario.
 *                 example: "SENA"
 *               ficha_aprendiz:
 *                 type: string
 *                 description: Ficha de aprendiz del usuario.
 *                 example: "12345"
 *               id_tipo_documento:
 *                 type: integer
 *                 description: Tipo de documento del usuario.
 *                 example: 1
 *               rol_id:
 *                 type: integer
 *                 description: ID del rol del usuario.
 *                 example: 2
 *               foto_usuario:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil del usuario.
 *               firma_usuario:
 *                 type: string
 *                 format: binary
 *                 description: Firma digital del usuario.
 *               foto_documento:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del documento del usuario.
 *               foto_carnet:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del carnet del usuario.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro exitoso"
 *                 data:
 *                   type: object
 *                   description: Registro exitoso.
 *       400:
 *         description: Datos faltantes o archivos no proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan archivos requeridos."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el registro de usuario"
 */
router.post("/registro", upload("usuarioSingle"), userController.registroUsuario);

/**
 * @swagger
 * /api/userUpdate/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     description: Actualiza la información de un usuario existente en la base de datos.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado del usuario.
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico actualizado del usuario.
 *                 example: "juanperez@example.com"
 *               contraseña:
 *                 type: string
 *                 description: Nueva contraseña del usuario (se almacenará encriptada).
 *                 example: "newpassword123"
 *               rol_id:
 *                 type: integer
 *                 description: ID del rol actualizado del usuario.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado correctamente"
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Faltan datos requeridos en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falta información requerida"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en actualizar el usuario"
 */
router.put("/userUpdate/:id", userController.actualizarUsuarioId);

/**
 * @swagger
 * /api/userDelete/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Elimina un usuario específico de la base de datos.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado"
 *                 deleteUsuario:
 *                   type: object
 *                   description: Información del usuario eliminado.
 *       400:
 *         description: Falta el ID del usuario o formato inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falta id de usuario"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno"
 */
router.delete("/userDelete/:id", userController.borrarUsuarioId);

/**
 * @swagger
 * /api/cerrarSesion:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     description: Elimina la cookie de autenticación y cierra la sesión del usuario.
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Sesion cerrada"
 */
router.post("/cerrarSesion", userController.cerrarSesion);

/**
 * @swagger
 * /api/verificarSesion:
 *   get:
 *     summary: Verificar autenticación del usuario
 *     description: Comprueba si el usuario está autenticado y devuelve su información.
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del usuario.
 *                       example: 1014477107
 *                     nombre:
 *                       type: string
 *                       description: Nombre del usuario.
 *                       example: "Diego"
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario.
 *                       example: "diego123@gmail.com"
 *                     rol_id:
 *                       type: integer
 *                       description: ID del rol del usuario.
 *                       example: 3
 *                     rol:
 *                       type: string
 *                       description: Nombre del rol del usuario.
 *                       example: "usuario"
 *                     permisos:
 *                       type: array
 *                       description: Lista de permisos asociados al usuario.
 *                       items:
 *                         type: string
 *                       example: []
 *                     iat:
 *                       type: integer
 *                       description: Timestamp de emisión del token.
 *                       example: 1743705405
 *                     exp:
 *                       type: integer
 *                       description: Timestamp de expiración del token.
 *                       example: 1743709005
 */
router.get("/verificarSesion", authenticateToken, userController.verificarAutenticacion);

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     description: Envía un correo con un enlace para restablecer la contraseña.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@gmail.com"
 *     responses:
 *       200:
 *         description: Correo enviado con instrucciones para recuperar la contraseña.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Correo enviado con instrucciones"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 */
router.post("/forgot-password", userController.forgotPassword);

/**
 * @swagger
 * /api/reset-password:
 *   get:
 *     summary: Verificar token de restablecimiento de contraseña
 *     description: Verifica si el token de restablecimiento de contraseña es válido y establece una cookie con el token.
 *     tags: [Autenticación]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de restablecimiento de contraseña recibido por correo.
 *     responses:
 *       200:
 *         description: Token válido, se establece una cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token valido"
 *                 userId:
 *                   type: integer
 *                   example: 12345678
 *       400:
 *         description: Token inválido o expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token invalido o expirado"
 *       401:
 *         description: Token no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token no encontrado"
 */
router.get("/reset-password", userController.resetPassword);

/**
 * @swagger
 * /api/reset-password-update:
 *   post:
 *     summary: Actualizar contraseña después de restablecimiento
 *     description: Permite a un usuario actualizar su contraseña utilizando un token de restablecimiento válido.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "NuevaContraseña123!"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizado correctamente"
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: No autorizado. No se proporcionó un token válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No autorizado"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en actualizar la contraseña"
 */
router.post("/reset-password-update", userController.resetPasswordUpdate);

export default router;
