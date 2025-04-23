import connection from "../db/connection.js";

class Strike {
    constructor({ id_strike, id_usuario, id_vehiculo, id_vigilante, id_reserva, fecha_strike, descripcion, id_admin_revisor }) {
        this.id_strike = id_strike;
        this.id_usuario = id_usuario;
        this.id_vehiculo = id_vehiculo;
        this.id_vigilante = id_vigilante;
        this.id_reserva = id_reserva;
        this.fecha_strike = fecha_strike;
        this.descripcion = descripcion;
        this.id_admin_revisor = id_admin_revisor;
    }

    async registarStrike() {
        const query = `INSERT INTO strikes (id_usuario, id_vehiculo, id_vigilante,
            id_reserva, descripcion) 
            VALUES (?, ?, ?, ?, ?)`;

        try {
            const [result] = await connection.promise().query(query, [this.id_usuario, this.id_vehiculo, this.id_vigilante, this.id_reserva, this.descripcion]);
            return result;
        } catch (error) {
            console.error("Error al registrar el strike", error);
            throw error;
        }
    }

    async registroNovedadStrike() {
        const query = `INSERT INTO novedad_strikes (id_usuario, id_vehiculo, id_vigilante,
                        id_reserva, descripcion) 
                        VALUES (?, ?, ?, ?, ?)`;

        try {
            const [result] = await connection.promise().query(query, [this.id_usuario, this.id_vehiculo, this.id_vigilante, this.id_reserva, this.descripcion]);
            return result;
        } catch (error) {
            console.error("Error al registrar la novedad de strike", err);
            throw error;
        }
    }

    static async aprobarNovedad(id_novedad, nuevoEstado) {
        const query = `UPDATE novedad_strikes SET estado = ? WHERE id_novedad = ?`;

        try {
            const [result] = await connection.promise().query(query, [nuevoEstado, id_novedad]);
            return result;
        } catch (error) {
            console.error("Error en actualizar el estado de la novedad", error);
            throw error;
        }
    }

    static async rechazarNovedad(id_novedad, nuevoEstado) {
        const query = `UPDATE novedad_strikes SET estado = ? WHERE id_novedad = ?`;

        try {
            const [result] = await connection.promise().query(query, [nuevoEstado, id_novedad]);
            return result;
        } catch (error) {
            console.error("Error al rechazar la novedad");
            throw error;
        }
    }


    static async obtenerNovedadesStrike(id_vigilante) {
        try {
            const query = `SELECT n.*, u.nombre AS nombre_usuario, v.placa AS placa_vehiculo
                           FROM novedad_strikes n
                           INNER JOIN usuario u ON n.id_usuario = u.id_documento
                           INNER JOIN vehiculo v ON n.id_vehiculo = v.placa
                           WHERE n.id_vigilante = ?
                           ORDER BY n.fecha_strike DESC;`

            const [result] = await connection.promise().query(query, [id_vigilante]);
            console.log("novedades", result);

            if (result.length === 0) {
                throw new Error("No se encontraron novedades");
            }

            return result;
        } catch (error) {
            console.log("Error en obtener las novedades", error);
            throw error;
        }
    }

    static async verNovedades() {
        try {
            const query = 'SELECT * FROM novedad_strikes';

            const [result] = await connection.promise().query(query);
            console.log("novedades general", result);

            if (result.length === 0) {
                throw new Error("No se encontraron novedades");
            }

            return result;
        } catch (error) {
            console.log("Error en obtener las novedades", error);
            throw error;
        }
    }

    static async obtenerStrikesUsuario(id_usuario) {
        try {
            const query = `SELECT id_strike, id_usuario, id_vehiculo, id_vigilante, id_reserva, fecha_strike, descripcion 
                           FROM strikes WHERE id_usuario = ?;`;
            
            console.log("strike id_usuario", id_usuario);
            const [result] = await connection.promise().query(query, [id_usuario]);
            console.log("stikes usuario", result);

            if (result.length === 0) {
                throw new Error("No se encontraron strikes para el usuario");
            }

            return result;
        } catch (error) {
            console.log("Error en obtener los strikes del usuario", error);
            throw error;
        }
    }
}

export default Strike;