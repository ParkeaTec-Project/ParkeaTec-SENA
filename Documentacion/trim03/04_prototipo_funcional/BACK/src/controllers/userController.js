import User from '../models/user.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, permisos } = await User.login(email, password);
        res.status(200).json({ 
            message: "Login exitoso",
            user: {
                id: user.id, 
                nombre: user.nombre,
                email: user.email,
                rol: user.rol_id,
                permisos
            },
        });
    } catch(err) {
        res.status(400).send(err);
    }
};

const crearUsuarios = async(req, res) => {
    const { id_documento, nombre, apellido, telefono, direccion, correo, password, foto_usuario, centro_formacion, ficha_aprendiz,
        firma_usuario, foto_documento, foto_carnet, id_tipo_documento, rol_id } = req.body;

    const crearUsuario = new User(id_documento, nombre, apellido, telefono, direccion, correo, password, foto_usuario, centro_formacion,
        ficha_aprendiz, firma_usuario, foto_documento, foto_carnet, id_tipo_documento, rol_id);

    try {
        const result = await crearUsuario.crearUsuarios();
        res.status(200).send("Usuario creado");
    } catch (err) {
        console.error("Error al crear el usuario:", err);
        res.status(500).send("Error al crear el usuario");
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.obtenerUsuarios();
        if(Object.keys(usuarios).length === 0) {
            res.status(404).send("No existen usuarios");
        }
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).send("Error al obtener los usuarios");
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
    } catch(err) {
        if(err === "Usuario no encontrado") {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.error("Error al obtener el usuario por ID:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

const actualizarUsuarioId = async (req, res) => {
    try {
        const { password } = req.body;
        const usuarioId = req.params.id;

        const actualizarUsuarioId = new User(password, usuarioId);

        const result = await actualizarUsuarioId.actualizarUsuarioId();
        if (result.affectedRows === 0) {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.status(200).send({ message: "Usuario actualiazado correctamente", result });
    } catch(err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(500).send({ message: "Error al actualizar el usuario" })
    }
};

export default {
    obtenerUsuarios,
    crearUsuarios,
    login,
    obtenerUsuarioId,
    actualizarUsuarioId
};