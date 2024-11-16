import User from '../models/user.js';

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

export default {
    obtenerUsuarios,
    crearUsuarios
};