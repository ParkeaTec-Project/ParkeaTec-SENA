import User from '../models/user.js';

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
    obtenerUsuarios
};