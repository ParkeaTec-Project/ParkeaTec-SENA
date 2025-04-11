import connection from "../db/connection.js";
import bcrypt from "bcrypt";

class user {
    constructor({ id_documento, nombre, apellido, telefono, direccion, correo, password, foto_usuario, centro_formacion, ficha_aprendiz, firma_usuario,foto_documento, foto_carnet, id_tipo_documento, rol_id }) {
        this.id_documento = id_documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.correo = correo;
        this.password = password;
        this.foto_usuario = foto_usuario;
        this.centro_formacion = centro_formacion;
        this.ficha_aprendiz = ficha_aprendiz;
        this.firma_usuario = firma_usuario;
        this.foto_documento = foto_documento;
        this.foto_carnet = foto_carnet;
        this.id_tipo_documento = id_tipo_documento;
        this.rol_id = rol_id;

        console.log("contraseña constructor:", this.password);
    }

    static async login(email, password) {
        const query = 'CALL ObtenerEmail(?)';

        try {
            const [result] = await connection.promise().query(query, [email]);

            if (result[0].length === 0) {
                throw new Error("Usuario no encontrado");
            }

            const user = result[0][0];

            const isMatch = await bcrypt.compare(password, user.contraseña);

            if (!isMatch) {
                throw new Error("Contraseña incorrecta");
            }

            const inforUser = 'CALL infoUsuario(?)';

            const [userResult] = await connection.promise().query(inforUser, [user.id_documento]);
            
            if (userResult[0].length > 0) {
                const rol = userResult[0][0].rol;
                const permisos = userResult[0].map(user => user.permiso);
                return { user, rol, permisos };
            } 

            const rolQuery = 'CALL InfoRol(?)';
            const [rolResult] = await connection.promise().query(rolQuery, [user.id_documento]);

            if (rolResult[0].length > 0) {
                const rol = rolResult[0][0].rol;
                return { user, rol, permisos: [] };
            } else {
                throw new Error("No se encontro el rol para este usuario");
            }

        } catch (error) {
            console.error("Error al iniciar sesion:", error);
            throw error;
        }
    } 

    static async findOne(email) {
        const query = 'CALL ObtenerEmail(?)';

        try {
            const [result] = await connection.promise().query(query, [email]);
            if (result[0].length === 0) {
                throw new Error("Usuario no encontrado");
            }

            return result[0];
        } catch (error) {
            console.error(`Error al obtener usuario`, error.message);
            throw error;
        }
    }

    async findById() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            const checkQuery = 'CALL ObtenerUsuarioId(?)';
            const [checkResult] = await connection.promise().query(checkQuery, [this.id_documento]);
            if (checkResult[0].length === 0) {
                throw new Error(`Usuario no encontrado con id: ${this.id_documento}`);
            }

            const query = 'UPDATE usuario SET contraseña = ? WHERE id_documento = ?';
            const [result] = await connection.promise().query(query, [hashedPassword, this.id_documento]);
            if (result.length === 0) {
                throw new Error("Error al actualizar el usuario");
            }

            return result;
        } catch (error) {
            console.error("Error en actualizar el usuario", error);
            throw error;
        }
    }
 
    async crearUsuarios() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            const query = 'Call CrearUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            const [result] = await connection.promise().query(query, [this.id_documento, this.nombre, this.apellido, this.telefono, this.direccion, this.correo, hashedPassword, this.foto_usuario, this.centro_formacion, this.ficha_aprendiz, this.firma_usuario, this.foto_documento, this.foto_carnet, this.id_tipo_documento, this.rol_id]);

            console.log("Resultado de la consulta:", result);
            if (result.affectedRows === 0) {
                throw new Error("Error al insertar usuario");
            }

            return result;
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw error;
        }
        
    }

    async RegistroUsuario() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            const query = 'CALL Registro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            
            const [result] = await connection.promise().query(query, [this.id_documento, this.nombre, this.apellido, this.telefono, this.direccion, this.correo, hashedPassword, this.foto_usuario, this.centro_formacion, this.ficha_aprendiz, this.firma_usuario, this.foto_documento, this.foto_carnet, this.id_tipo_documento, this.rol_id]);

            console.log("resultado de la consola");
            if (result.affectedRows === 0) {
                throw new Error("Error al hacer el registro de usuario");
            }

            return result;
        } catch (error) {
            console.error("Error al crear el registro de usuario", error);
            throw error;
        }
    } 
    
    static async actualizarFotos(usuarioId, firma_usuario, foto_documento, foto_carnet) {
        try {
            const query = 'UPDATE usuario SET firma_usuario = ?, foto_documento = ?, foto_carnet = ? WHERE id_documento = ?';
            const [result] = await connection.promise().query(query, [firma_usuario, foto_documento, foto_carnet, usuarioId]);

            if (result.affectedRows === 0) {
                throw new Error("No se encontro el usuario para actualizar las fotos");
            }

            return result;
        } catch (error) {
            console.error("Error al actualizar las fotos del usuario", error);
            throw error;
        }
    }

    static async obtenerUsuarios() {
        const query = 'SELECT * FROM obtenerusuario';

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerUsuarioId(id) {
        try {
            const query = 'CALL DetalleUsuarioDocumento(?)';
            // const query = 'SELECT u.id_documento, u.nombre, u.apellido, u.telefono, u.direccion, u.correo_electronico, u.contraseña, u.foto_usuario, u.firma_usuario, u.foto_documento, u.foto_carnet, r.nombre AS rol, td.nombre_documento FROM usuario AS u INNER JOIN roles AS r ON u.rol_id = r.id INNER JOIN tipo_documento AS td ON u.id_tipo_documento = td.id WHERE u.id_documento = ?;'

            const [result] = await connection.promise().query(query, [id]);

            if (result[0].length === 0) {
                throw new Error(`Usuario no encontrado con id ${id}`);
            }

            return result[0];
        } catch (error) {
            console.error(`Error al obtener usuario con id ${id}: `, error.message);
            throw error;
        }
    }

    async actualizarUsuarioId() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            console.log("contraseña hasheada", hashedPassword);

            const checkQuery = 'CALL ObtenerUsuarioId(?)';
            const [checkResult] = await connection.promise().query(checkQuery, [this.id_documento]);
            console.log("checkResult", checkResult)
            if (checkResult[0].length === 0) {
                throw new Error(`Usuario no encontrado con id: ${this.id_documento}`);
            }

            //const query = 'UPDATE usuario SET contraseña = ? WHERE id_documento = ?';
            const query = 'CALL ActualizarUsuario(?, ?, ?, ?, ?)';

            const [result] = await connection.promise().query(query, [this.nombre, this.correo, hashedPassword, this.rol_id, this.id_documento]);
            console.log("resultado..", result);
            if (result.length === 0) {
                throw new Error(`Error al actualizar el usuario con id ${this.id_documento}`);
            }

            return result;

        } catch (error) {
            console.error("Error en actualizar el usuario", error);
            throw error;
        }
    }

    static async borrarUsuarioId(id) {
        if (!id || isNaN(id)) {
            throw new Error("ID de usuario invalido")
        }

        try {
            const checkQuery = 'CALL ObtenerUsuarioId(?)';
            const [checkResult] = await connection.promise().query(checkQuery, [id]);

            if (checkResult[0].length === 0) {
                throw new Error(`Usuario no encontrado con id ${id}`);
            }

            //Eliminar el vehiculo asociado al usuario
            const deleteVehicle = 'DELETE FROM vehiculo WHERE id_documento = ?';
            await connection.promise().query(deleteVehicle, [id]);

            //Eliminar el usuario
            const query = 'CALL BorrarUsuario(?)';
            const [result] = await connection.promise().query(query, [id]);

            if (result.affectedRows === 0) {
                throw new Error(`No se pudo borrar el usuario con el id ${id}`);
            }

            return result;
        } catch (error) {
            console.error(`Error al borrar el usuario con id ${id}`)
            throw error;
        }
    }
}

export default user;