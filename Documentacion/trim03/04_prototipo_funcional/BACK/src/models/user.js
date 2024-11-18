import connection from "../db/connection.js";
import bcrypt from "bcrypt";

class user {
    constructor(id_documento, nombre, apellido, telefono, direccion, correo, password, foto_usuario, centro_formacion, ficha_aprendiz, firma_usuario, foto_documento, foto_carnet, id_tipo_documento, rol_id) {
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
    }

    static async login(email, password) {
        const query = 'SELECT * FROM usuario WHERE correo_electronico = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [email], async (err, result) => {
                if(err) {
                    console.error('Error al iniciar sesion:', err);
                    return reject(err);
                }

                if(result.length === 0) {
                    return reject("Usuario no encontrado");
                }

                const user = result[0];
                console.log(user);
                console.log(password);
                const isMatch = await bcrypt.compare(password, user.contraseña);

                if(!isMatch) {
                    return reject("Contraseña incorrecta");
                }

                const permisosQuery = `
                    SELECT p.nombre AS permiso
                    FROM roles r
                    JOIN rol_permisos rp ON r.id = rp.rol_id
                    JOIN permisos p ON rp.permiso_id = p.id
                    WHERE r.id = ?;
                `

                connection.query(permisosQuery, [user.rol_id], (err, permisosResult) => {
                    if(err) {
                        return reject(err);
                    }

                    console.log(permisosResult)
                    const permisos = permisosResult.map(permiso => permiso.permiso);

                    resolve({ user, permisos })
                });
            });
        });
    } 


    async crearUsuarios() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            const query = 'INSERT INTO usuario (id_documento, nombre, apellido, telefono, direccion, correo_electronico, contraseña, foto_usuario, centro_formacion, ficha_aprendiz, firma_usuario, foto_documento, foto_carnet,  id_tipo_documento, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
            return new Promise((resolve, reject) => {
                connection.query(query, [this.id_documento, this.nombre, this.apellido, this.telefono, this.direccion, this.correo, hashedPassword, this.foto_usuario, this.centro_formacion, this.ficha_aprendiz, this.firma_usuario, this.foto_documento, this.foto_carnet, this.id_tipo_documento, this.rol_id], (err, result) => {
                if(err) {
                    console.error('Error al insertar usuario:', err);
                    return reject(err);
                }
                resolve(result);
                });
            });
        } catch (err) {
            console.error('Error general en crearUsuarios:', err);
            throw err;
        }
    }
        

    static async obtenerUsuarios() {
        const query = 'SELECT * FROM usuario';

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerUsuarioId() {
        
    }
}

export default user;