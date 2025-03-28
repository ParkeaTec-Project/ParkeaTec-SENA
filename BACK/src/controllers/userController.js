import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user, rol, permisos) => {
    return jwt.sign(
        {
            id: user.id_documento,
            nombre: user.nombre,
            email: user.correo_electronico,
            rol_id: user.rol_id,
            rol,
            permisos
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, rol, permisos } = await User.login(email, password);

        const token = generateToken(user, rol, permisos);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_MS)
        });

        res.status(200).json({
            message: 'Login exitoso',
            user: {
                id: user.id_documento,
                nombre: user.nombre,
                rol
            }
        });
    } catch(error) {
        console.error("Error de login", error)
        res.status(400).json({ message: error.message });
    }
};

const protectedRoute = (req, res) => {
    res.json({
        message: 'Ruta protegida - Acceso concedido',
        user: req.user
    });
};

const verificarAutenticacion = async (req, res) => {
    res.status(200).json({
        isAuthenticated: true,
        user: req.user
    });
};

const cerrarSesion = async (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.status(200).json({
        isAuthenticated: false,
        message: 'Sesion cerrada'
    });
}

const crearUsuarios = async(req, res) => {
    const { id_documento, nombre, apellido, telefono, direccion, correo, password, centro_formacion, ficha_aprendiz,
        firma_usuario, foto_documento, foto_carnet, id_tipo_documento, rol_id } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "No puede estar vacio, carga una imagen" });
    }

    const fotoUsuarioPath = `uploads/${req.file.filename}`;

    const crearUsuario = new User({ id_documento: id_documento, nombre: nombre, apellido: apellido, telefono: telefono, direccion: direccion, correo: correo, password: password, foto_usuario: fotoUsuarioPath, centro_formacion: centro_formacion, ficha_aprendiz: ficha_aprendiz, firma_usuario: firma_usuario, foto_documento: foto_documento, foto_carnet: foto_carnet, id_tipo_documento: id_tipo_documento, rol_id: rol_id });

    console.log("Usuario creado", crearUsuario);

    try {
        await crearUsuario.crearUsuarios();
        res.status(200).json({ message: "Usuario creado" });
    } catch (err) {
        console.error("Error al crear el usuario:", err.message);
        res.status(500).json({ message: err.message });
    }
};

const registroUsuario = async(req, res) => {
    try {
        const { id_documento, nombre, apellido, telefono, direccion, correo, password, centro_formacion, ficha_aprendiz,
            id_tipo_documento, rol_id } = req.body;

        const foto_usuario = req.files?.foto_usuario?.[0]?.filename || null;
        const firma_usuario = req.files?.firma_usuario?.[0]?.filename || null;
        const foto_documento = req.files?.foto_documento?.[0]?.filename || null;
        const foto_carnet = req.files?.foto_carnet?.[0]?.filename || null;
    
        console.log("datos", req.body);

        if (!foto_usuario || !firma_usuario || !foto_documento || !foto_carnet) {
            return res.status(400).json({ message: "Faltan archivos requeridos." });
        }

        const fotoUsuarioPath = foto_usuario ? `uploads/${foto_usuario}` : null;
        const firmaUsuarioPath = firma_usuario ? `uploads/${firma_usuario}` : null;
        const fotoDocumentoPath = foto_documento ? `uploads/${foto_documento}` : null;
        const fotoCarnetPath = foto_carnet ? `uploads/${foto_carnet}` : null;

        const registroUsuario = new User({ 
            id_documento: id_documento, nombre: nombre, apellido: apellido, 
            telefono: telefono, direccion: direccion, correo: correo, 
            password: password, foto_usuario: fotoUsuarioPath, 
            centro_formacion: centro_formacion, ficha_aprendiz: ficha_aprendiz, 
            firma_usuario: firmaUsuarioPath, foto_documento: fotoDocumentoPath, 
            foto_carnet: fotoCarnetPath, id_tipo_documento: id_tipo_documento, rol_id: rol_id 
        });

        console.log("registro usuario", registroUsuario);
        const result = await registroUsuario.RegistroUsuario();
    
        
        res.status(201).json({ message: "Registro exitoso", data: result });
    } catch (error) {
        console.error("Error al hacer el registro:", err);
        res.status(500).json({ message: error.message });
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.obtenerUsuarios();
        if(Object.keys(usuarios).length === 0) {
            res.status(404).json({ message: "No existen usuarios" });
        }
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

const obtenerUsuarioId = async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if(!usuarioId) {
            return res.status(400).json({ error: "Id de usuario invalido" })
        }

        const usuario = await User.obtenerUsuarioId(usuarioId);
        res.status(200).json({ usuario });
    } catch (error) {
        if(error.message.includes("Usuario no encontrado")) {
            return res.status(404).json({ message: error.message });
        }

        console.error("Error al obtener el usuario por ID:", error);
        res.status(500).json({ message: "Error interno" });
    }
};

const actualizarUsuarioId = async (req, res) => {
    try {
        console.log(req.body)
        const { nombre, email, contraseña, rol_id } = req.body;
        const usuarioId = req.params.id;

        console.log("id usuario:", usuarioId);
        console.log("body:", req.body);
        console.log("new contraseña:", contraseña);

        if(!nombre || !email || !contraseña || !rol_id) {
            return res.status(400).json({ message: "Falta informacion requerida" })
        }

        const updateUsuario = new User({ 
            id_documento: usuarioId, nombre: nombre, 
            correo: email, password: contraseña, 
            rol_id: rol_id 
        });
        const result = await updateUsuario.actualizarUsuarioId();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ 
            message: "Usuario actualiazado correctamente", result,
            affectedRows: result.affectedRows
        });
        
    } catch(error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ message: error.message })
    }
};

const borrarUsuarioId = async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if(!usuarioId || !/^\d+$/.test(usuarioId)) {
            return res.status(400).json({ message: "Falta id de usuario" })
        }

        const deleteUsuario = await User.borrarUsuarioId(usuarioId)
        res.status(200).json({ message: "Usuario eliminado", deleteUsuario })
    } catch(error) {
        if(error.message.includes("Usuario no encontrado")) {
            return res.status(404).json({ message: error.message });
        }

        if (error.message.includes("ID de usuario invalido")) {
            return res.status(400).json({ message: error.message });
        }

        console.error("Error al obtener el usuario por ID:", usuarioId, error);
        res.status(500).json({ message: "Error interno" });
    }
}

export default {
    obtenerUsuarios,
    crearUsuarios,
    registroUsuario,
    login,
    obtenerUsuarioId,
    actualizarUsuarioId,
    borrarUsuarioId,
    cerrarSesion,
    verificarAutenticacion,
    protectedRoute
};