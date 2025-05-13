import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode'
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
            success: true,
            data: {
                id: user.id_documento,
                nombre: user.nombre,
                rol,
                session_token: `JWT ${token}`
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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'juanandres78.jg@gmail.com',
        pass: 'uptr zuar fjll xkeh'
    }
});

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne(email);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const token = jwt.sign({ id: user[0].id_documento }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
        from: "ParkeaTec <juanandres78.jg@gmail.com>",
        to: email,
        subject: 'Recuperacion de contraseña - ParkeaTec',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px;
            margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">

                <div style="background-color: #2563eb; padding: 24px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">
                        ParkeaTec
                    </h1>
                </div>

                <div style="padding: 32px 24px; background-color: #f9fafb;">
                    <h2 style="color: #111827; font-size: 20px; margin-top: 0;">¡Hola!</h2>
                    <p style="color: 4b5563; line-height: 1.6; margin-bottom: 24px;">
                        Recibiste este correo porque solicitaste restablecer tu contraseña en ParkeaTec.
                        Haz clic en el siguiente botón para continuar con el proceso:
                    </p>

                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${resetLink}"
                           style="background-color: #2563eb; color: white; padding: 16px 32px; border-radius: 8px;
                           text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">
                           Restablecer contraseña
                        </a>
                    </div>

                    <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                        <strong>Importante:</strong> Este enlace expirara en <strong>15 minutos</strong>.<br>
                        Si no solicitaste este cambio, por favor ignora este mensaje.
                    </p>
                </div>

                <div style="background-color: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px;
                color: #6b7280;">
                    <p style="margin: 4px 0;">
                        © ${new Date().getFullYear()} ParkeaTec. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        `
    }
    await transporter.sendMail(mailOptions);
    
    console.log(`Enviar este enlace por correo: ${resetLink}`);

    res.status(200).json({ message: 'Correo enviado con instrucciones' });
};

const resetPassword = async (req, res) => {
    //const token = req.cookies.resetToken;
    const { token } = req.query;

    if (!token) {
        return res.status(401).json({
            message: 'Token no encontrado'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Establecer cookie solo si el token es valido
        res.cookie('resetToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({ message: 'Token valido', userId: decoded.id_documento })
    } catch (error) {
        res.status(400).json({ message: 'Token invalido o expirado' });
    }
};

const resetPasswordUpdate = async (req, res) => {
    const token = req.cookies.resetToken;
    const { password } = req.body;

    if (!token) {
        return res.status(401).json({
            message: 'No autorizado'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const updateUser = new User({
            id_documento: decoded.id,
            password: password
        });

        const result = await updateUser.findById();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        res.clearCookie('resetToken');

        res.status(200).json({
            message: "Contraseña actualizada correctamente", result,
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
        res.status(500).json({ message: error.message })
    }
}

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

        const foto_usuario = req.file?.filename

    // if (!foto_usuario) {
    //     return res.status(400).json({ message: "No puede estar vacio, carga una imagen" });
    // }


    const crearUsuario = new User({ id_documento: id_documento, nombre: nombre, apellido: apellido, telefono: telefono, direccion: direccion, correo: correo, password: password, foto_usuario, centro_formacion: centro_formacion, ficha_aprendiz: ficha_aprendiz, firma_usuario: firma_usuario, foto_documento: foto_documento, foto_carnet: foto_carnet, id_tipo_documento: id_tipo_documento, rol_id: rol_id });

    console.log("Usuario creado", crearUsuario);

    try {
        await crearUsuario.crearUsuarios();
        res.status(200).json({ message: "Usuario creado", crearUsuario });
    } catch (err) {
        console.error("Error al crear el usuario:", err.message);
        res.status(500).json({ message: err.message });
    }
};

const registroUsuario = async(req, res) => {
    try {
        const { id_documento, nombre, apellido, telefono, direccion, correo, password, centro_formacion, ficha_aprendiz,
            id_tipo_documento, rol_id } = req.body;

        const foto_usuario = req.file?.filename;
        console.log("foto_usuario", foto_usuario);

        if (!foto_usuario) {
            return res.status(400).json({ message: "Faltan archivos requeridos." });
        }

        //const processFile = (field) => req.files?.[field]?.[0]?.filename || null;

        console.log("datos body", req.body);
        console.log("datos file", req.files);


        const registroUsuario = new User({ 
            id_documento, 
            nombre, 
            apellido, 
            telefono, 
            direccion,
            correo, 
            password, 
            // foto_usuario: processFile('foto_usuario'), 
            foto_usuario,
            centro_formacion, 
            ficha_aprendiz, 
            // firma_usuario: processFile('firma_usuario'), 
            firma_usuario: "",
            // foto_documento: processFile('foto_documento'), 
            foto_documento: "",
            // foto_carnet: processFile('foto_carnet'), 
            foto_carnet: "",
            id_tipo_documento, 
            rol_id 
        });

        console.log("registro usuario", registroUsuario);
        const result = await registroUsuario.RegistroUsuario();
    
        
        res.status(201).json({ message: "Registro exitoso", data: result });
    } catch (error) {
        console.error("Error al hacer el registro:", error);
        res.status(500).json({ message: error.message });
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.obtenerUsuarios();
        if(Object.keys(usuarios).length === 0) {
            res.status(404).json({ message: "No existen usuarios" });
        }
        res.status(200).json({message: "Usuarios obtenidos exitosamente.", usuarios});
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

        const datosUsuario = usuario[0];

        //Generar QR
        const qrData = JSON.stringify({ documento: datosUsuario.id_documento });
        const qrCodeImage = await QRCode.toDataURL(qrData);


        res.status(200).json({ 
            message: "Usuario obtenido exitosamente.", 
            usuario,
            qrCode: qrCodeImage
        });
    } catch (error) {
        if(error.message.includes("Usuario no encontrado")) {
            return res.status(404).json({ message: error.message });
        }

        console.error("Error al obtener el usuario por ID:", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
};

const actualizarUsuarioId = async (req, res) => {
    try {

        console.log("Datos recibidos:", req.body);
        const { nombre, correo, password, rol_id } = req.body;
        const usuarioId = req.params.id;

        console.log("id usuario:", usuarioId);
        console.log("body:", req.body);
        console.log("new contraseña:", password);

        if(!nombre || !correo || !rol_id) {
            return res.status(400).json({ message: "Falta informacion requerida" })
        }

        const updateUsuario = new User({ 
            id_documento: usuarioId,
            nombre: nombre, 
            correo: correo, 
            rol_id: rol_id,
            password: password
        });
        
        const result = await updateUsuario.actualizarUsuarioId();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ 
            message: "Usuario actualiazado correctamente", 
            nombre,
            correo,
            rol_id,
            result,
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

        console.error("Error al hacer la solicitud de borrar:", error);
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
    protectedRoute,
    forgotPassword,
    resetPassword,
    resetPasswordUpdate
};