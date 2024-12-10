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

        return new Promise((resolve, reject) => {
            connection.query(query, [email], async (err, result) => {
                console.log("obtener email:", result);
                if(err) {
                    console.error('Error al iniciar sesion:', err);
                    return reject(err);
                }

                if(result[0].length === 0) {
                    return reject("Usuario no encontrado");
                }

                //const user1 = result[0];
                const user = result[0][0];
                console.log("userPrubea", user);
                //console.log("sin array", user1);
                //console.log("doble array", user);
                console.log(password);
                const isMatch = await bcrypt.compare(password, user.contraseña);
                console.log("password isMatch", isMatch);

                if(!isMatch) {
                    return reject("Contraseña incorrecta");
                }

                
                const infoUser = 'CALL InfoUsuario(?)';
                // const infoUser = 'SELECT r.nombre AS rol, p.nombre AS permiso FROM usuario u INNER JOIN roles r ON u.rol_id = r.id INNER JOIN rol_permisos rp ON r.id = rp.rol_id INNER JOIN permisos p ON rp.permiso_id = p.id WHERE u.id_documento = ?;'

                connection.query(infoUser, [user.id_documento], (err, userResult) => {
                    if(err) {
                        return reject(err);
                    }
                    console.log("userResult:", userResult)

                    if(userResult[0].length > 0) {
                        const rol = userResult[0][0].rol;
                        const permisos = userResult[0].map(user => user.permiso);

                        console.log(rol, permisos);

                        resolve({ user, rol, permisos})
                    } else {
                        const rolQuery = `CALL InfoRol(?)`;
                        // const rolQuery = 'SELECT r.nombre AS rol FROM roles r INNER JOIN usuario u ON u.rol_id = r.id WHERE u.id_documento = ?;'

                        connection.query(rolQuery, [user.id_documento], (err, rolResult) => {
                            console.log("rolResult:", rolResult)
                            if(rolResult.length > 0) {
                                const rol = rolResult[0][0].rol;
                                resolve({ user, rol, permisos: [] });
                            } else {
                                reject("No se encontró el rol para este usuario.");
                            }
                        })
                        
                    }

                });
            });
        });
    } 


    async crearUsuarios() {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            const query = 'Call CrearUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
            return new Promise((resolve, reject) => {
                connection.query(query, [this.id_documento, this.nombre, this.apellido, this.telefono, this.direccion, this.correo, hashedPassword, this.foto_usuario, this.centro_formacion, this.ficha_aprendiz, this.firma_usuario, this.foto_documento, this.foto_carnet, this.id_tipo_documento, this.rol_id], (err, result) => {
                if(err) {
                    console.error('Error al insertar usuario:', err);
                    return reject(err);
                }
                console.log("creacion usuario", result);
                resolve(result);
                });
            });
        } catch (err) {
            console.error('Error general en crearUsuarios:', err);
            throw err;
        }
    }

    async RegistroUsuario() {
        
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            console.log("prueba modelo", this.id_documento, this.nombre, this.apellido, this.telefono, this.direccion, this.correo, hashedPassword, this.foto_usuario, this.centro_formacion, this.ficha_aprendiz, this.firma_usuario, this.foto_documento, this.foto_carnet, this.id_tipo_documento, this.rol_id);
            const query = 'Call Registro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
            return new Promise((resolve, reject) => {
                connection.query(query, [this.id_documento, this.nombre, this.apellido, this.telefono, this.direccion, this.correo, hashedPassword, this.foto_usuario, this.centro_formacion, this.ficha_aprendiz, this.firma_usuario, this.foto_documento, this.foto_carnet, this.id_tipo_documento, this.rol_id], (err, result) => {
                if(err) {
                    console.error('Error al hacer el registro de usuario:', err);
                    return reject(err);
                }
                resolve(result);
                });
            });
        } catch (err) {
            console.error('Error general en registro de usuario:', err);
            throw err;
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
        const query = 'CALL DetalleUsuarioDocumento(?)';
        // const query = 'SELECT u.id_documento, u.nombre, u.apellido, u.telefono, u.direccion, u.correo_electronico, u.contraseña, u.foto_usuario, u.firma_usuario, u.foto_documento, u.foto_carnet, r.nombre AS rol, td.nombre_documento FROM usuario AS u INNER JOIN roles AS r ON u.rol_id = r.id INNER JOIN tipo_documento AS td ON u.id_tipo_documento = td.id WHERE u.id_documento = ?;'

        try {
            return new Promise((resolve, reject) => {
                connection.query(query, [id], (err, result) => {
                    if (err) {
                        console.error('Error al encontrar al usuario', err);
                        return reject(err);
                    }

                    if(result.length === 0) {
                        return reject("Usuario no encontrado");
                    }

                    resolve(result[0][0]);
                })
            })
        } catch(err) {
            console.error('Error general en obtener usuario por id:', err);
            throw err;
        }
    }

    async actualizarUsuarioId() {
        try {
            console.log("Contraseña proporcionada:", this.password);
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            console.log("contraseña hasheada", hashedPassword);

            return new Promise((resolve, reject) => {
                const checkQuery = 'CALL ObtenerUsuarioId(?)';
                connection.query(checkQuery, [this.id_documento], (err, result) => {
                    if(err) return reject(err);
    
                    if(result[0].length === 0) {
                        return reject(new Error('Usuario no encontrado'));
                    }
    
    
                    //const query = 'UPDATE usuario SET contraseña = ? WHERE id_documento = ?';
                    const query = 'CALL ActualizarUsuario(?, ?, ?, ?)';
                    
                    connection.query(query, [this.nombre, this.correo,hashedPassword, this.id_documento], (err, result) => {
                        console.log("actualizar", result)
                        if(err) return reject(err);
                        resolve(result);
                    });
                });
            });
        } catch(err) {
            throw err;
        }
    }

    static async borrarUsuarioId(id) {
        try {
            return new Promise((resolve, reject) => {
                const checkQuery = 'CALL ObtenerUsuarioId(?)';
                connection.query(checkQuery, [id], (err, result) => {
                    if(err) return reject(err);

                    if(result.length === 0) {
                        return reject(new Error("Usuario no encontrado"));
                    }

                    const query = 'BorrarUsuario(?)';
                    connection.query(query, [id], (err, result) => {
                        if(err) return reject(err);
                        resolve(result);
                    });
                });
            });
        } catch(err) {
            throw err;
        }
    }
}

export default user;