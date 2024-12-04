import User from '../models/user.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, rol, permisos } = await User.login(email, password);

        req.session.user = {
            email: email,
            rol,
            permisos
        };

        console.log("Sesion creada:", req.session.user);

        res.status(200).json({ 
            message: "Login exitoso",
            user: {
                id: user.id_documento, 
                nombre: user.nombre,
                email: user.correo_electronico,
                rol_id: user.rol_id,
                rol,
                permisos
            },
        });
    } catch(err) {
        res.status(400).json({ message: err} );
    }
};

const checkSession = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            isAuthenticated: true,
            user: req.session.user
        });
    } else {
        res.status(200).json({
            isAuthenticated: false
        });
    }
};

const cerrarSesion = async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.status(500).json({ message: "Error al cerrar sesion" })
        }

        //Limpiar las cookies
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Sesion cerrada exitosamente" })
    })
}

const crearUsuarios = async(req, res) => {
    const { id_documento, nombre, apellido, telefono, direccion, correo, contraseña, foto_usuario, centro_formacion, ficha_aprendiz,
        firma_usuario, foto_documento, foto_carnet, id_tipo_documento, rol_id } = req.body;

    const crearUsuario = new User({ id_documento: id_documento, nombre: nombre, apellido: apellido, telefono: telefono, direccion: direccion, correo: correo, password: contraseña, foto_usuario: foto_usuario, centro_formacion: centro_formacion, ficha_aprendiz: ficha_aprendiz, firma_usuario: firma_usuario, foto_documento: foto_documento, foto_carnet: foto_carnet, id_tipo_documento: id_tipo_documento, rol_id: rol_id });

    console.log("create usuario", crearUsuario);

    try {
        const result = await crearUsuario.crearUsuarios();
        res.status(200).json({ message: "Usuario creado" });
    } catch (err) {
        console.error("Error al crear el usuario:", err);
        res.status(500).json({ message: "Error al crear el usuario" });
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
        console.log(req.body)
        const { password } = req.body;
        const usuarioId = req.params.id;

        console.log("id usuario:", usuarioId);
        console.log("new contraseña:", password);

        if(!password) {
            return res.status(400).send({ message: "Falta informacion requerida" })
        }

        const updateUsuario = new User({ id_documento: usuarioId, password: password });
        const result = await updateUsuario.actualizarUsuarioId();

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        res.status(200).send({ message: "Usuario actualiazado correctamente", result });
        
    } catch(err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(500).send({ message: "Error al actualizar el usuario" })
    }
};

const borrarUsuarioId = async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if(!usuarioId) {
            return res.status(400).json({ message: "Falta id de usuario" })
        }

        const deleteUsuario = await User.borrarUsuarioId(usuarioId)
        res.status(200).json({ message: "usuario eliminado", deleteUsuario })
    } catch(err) {
        if(err === "Usuario no encontrado") {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.error("Error al obtener el usuario por ID:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export default {
    obtenerUsuarios,
    crearUsuarios,
    login,
    obtenerUsuarioId,
    actualizarUsuarioId,
    borrarUsuarioId,
    cerrarSesion,
    checkSession
};