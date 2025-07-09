import connection from "../db/connection.js";

class Reserva {
    constructor({ id_reserva, fecha_creacion, estado, fecha_hora_entrada, fecha_hora_salida, puesto_asignado, id_documento, vehiculo_placa }) {
        this.id_reserva = id_reserva;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
        this.fecha_hora_entrada = fecha_hora_entrada;
        this.fecha_hora_salida = fecha_hora_salida;
        this.puesto_asignado = puesto_asignado;
        this.id_documento = id_documento;
        this.vehiculo_placa = vehiculo_placa;
    }

    static async verificarPuesto(puesto_asignado) {
        console.log("puesto asignado", puesto_asignado);
        //const queryCheck = `SELECT COUNT(*) AS count FROM reserva WHERE puesto_asignado = ? AND estado IN ('confirmada', 'pendiente')`;
        const queryCheck = `SELECT COUNT(*) AS count FROM reserva WHERE puesto_asignado = ? AND estado IN ('reservado')`;
        //const queryCheck = `SELECT COUNT(*) AS count FROM reserva WHERE puesto_asignado = ?`;
    
        try {
            const [rows] = await connection.promise().query(queryCheck, [puesto_asignado]);
            console.log("Puesto ocupado:", rows);
            return rows[0].count > 0; // Devuelve true si el puesto esta ocupado
        } catch (err) {
            console.error("Error al verificar el puesto ocupado:", err);
            throw err;
        }
    }

    async crearReserva() {
        
        const query = `INSERT INTO reserva (fecha_creacion, 
        estado, fecha_hora_entrada, fecha_hora_salida, puesto_asignado, 
        id_documento, vehiculo_placa) VALUES (?, ?, ?, ?, ? ,?, ?)`;
        
        try {
            const [result] = await connection.promise().query(query, [this.fecha_creacion, this.estado, this.fecha_hora_entrada, this.fecha_hora_salida, this.puesto_asignado, this.id_documento, this.vehiculo_placa]);
            return result;
        } catch (err) {
            console.error('Error al crear la reserva: ', err);
            throw err;
        }
    }

    static async obtenerReserva(placa) {
        console.log("Verificando reservas activas para placa:", placa);
        const query = `SELECT COUNT(*) AS count FROM reserva WHERE vehiculo_placa = ? AND estado IN ('activa', 'pendiente', 'aceptada');`

        try {
            const [rows] = await connection.promise().query(query, [placa]);
            console.log("rows", rows);
            return rows[0].count > 0;
        } catch (err) {
            console.error("Error al obtener la reserva", err);
            throw err;
        }
    }

    static async obtenerReservas(id) {
        const query = `SELECT r.id_reserva, p.numero_espacio, r.fecha_creacion, r.estado, r.fecha_hora_entrada, r.fecha_hora_salida, r.id_documento, r.vehiculo_placa FROM reserva r
                       INNER JOIN parqueadero p ON r.puesto_asignado = p.id_parqueadero
                       WHERE id_documento = ?;`
        
        try {
            const [result] = await connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.error("Error al obtener las reservas del usuario", err);
            throw err; 
        }
    }

    static async obtenerReservaActiva(id) {
        const query = `SELECT r.id_reserva, p.numero_espacio, r.fecha_creacion, r.estado, r.fecha_hora_entrada, r.fecha_hora_salida, r.id_documento, r.vehiculo_placa FROM reserva r
                       INNER JOIN parqueadero p ON r.puesto_asignado = p.id_parqueadero
                       WHERE id_documento = ? AND r.estado in ('activa', 'pendiente');`
        
        try {
            const [result] = await connection.promise().query(query, [id]);
            return result;
        } catch (err) {
            console.error("Error al obtener la reserva activa del usuario", err);
            throw err;
        }
    }

    static async cancelarReserva(id) {
        //const connection = await connection.promise().getConnection();
        try {
            //await connection.beginTransaction();

            const queryCheck = `SELECT puesto_asignado FROM reserva 
                                WHERE id_reserva = ? AND estado IN ('activa', 'pendiente');`;
            const [reserva] = await connection.promise().query(queryCheck, [id]);
            console.log("reserva", reserva);

            if (reserva.length === 0) {
                throw new Error("No se encontro una reserva activa o pendiente con ese id");
            }

            const id_espacio = reserva[0].puesto_asignado;

            const query = `UPDATE reserva SET estado = 'cancelada' WHERE id_reserva = ? AND estado IN ('activa', 'pendiente')`;
            const [result] = await connection.promise().query(query, [id]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se encontro ninguna reserva");
            }

            const espacio = `UPDATE parqueadero SET disponibilidad = "libre" WHERE id_parqueadero = ?;`
            const [resultEspacio] = await connection.promise().query(espacio, [id_espacio]);
            return result, resultEspacio;
        } catch (error) {
            console.log("Error en la cancelacion", error);
            throw error;
        }
    }

    static async aceptarReserva(id) {
        try {
            const queryCheck = `SELECT puesto_asignado FROM reserva
                                WHERE id_reserva = ? AND estado IN ('pendiente');`;
            const [reserva] = await connection.promise().query(queryCheck, [id]);
            console.log("aceptar reserva", reserva);

            if (reserva.length === 0) {
                throw new Error("No se encontro una reserva activa");
            }

            const id_espacio = reserva[0].puesto_asignado;

            const query = `UPDATE reserva SET estado = 'aceptada', fecha_hora_entrada = NOW() WHERE id_reserva = ? AND estado IN ('pendiente')`;
            const [result] = await connection.promise().query(query, [id]);

            if (result.affectedRows === 0) {
                throw new Error("No se encontro ninguna reserva");
            }

            const espacio = `UPDATE parqueadero SET disponibilidad = 'ocupado' WHERE id_parqueadero = ?`;
            const [resultEspacio] = await connection.promise().query(espacio, [id_espacio]);
            return result, resultEspacio;
        } catch (error) {
            console.log("Error en la aceptacion de reserva", error);
            throw error;
        }
    }

    static async finalizarReserva(id) {
        try {
            const queryCheck = `SELECT puesto_asignado FROM reserva 
                                WHERE id_reserva = ? AND estado IN ('aceptada')`;
            const [reserva] = await connection.promise().query(queryCheck, [id]);
            console.log("finalizar reserva", reserva);

            if (reserva.length === 0) {
                throw new Error("No se encontro una reserva aceptada");
            }

            const id_espacio = reserva[0].puesto_asignado;

            const query = `UPDATE reserva SET estado = 'finalizada', fecha_hora_salida = NOW() WHERE id_reserva = ? AND estado IN ('aceptada')`;
            const [result] = await connection.promise().query(query, [id]);

            if (result.affectedRows === 0) {
                throw new Error("No se encontro ninguna reserva");
            }

            const espacio = `UPDATE parqueadero SET disponibilidad = 'libre' WHERE id_parqueadero = ?`;
            const [resultEspacio] = await connection.promise().query(espacio, [id_espacio]);
            return result, resultEspacio
        } catch (error) {
            console.log("Error en la aceptacion de reserva", error);
            throw error;
        }
    }

    static async obtenerReservaEspacio(id) {
        try {
            const query = `SELECT r.*, p.tipo_parqueadero
            FROM reserva r
            JOIN parqueadero p ON r.puesto_asignado = p.id_parqueadero
            WHERE r.puesto_asignado = ?
            AND r.estado IN ('aceptada', 'ocupada', 'pendiente')
            ORDER BY r.fecha_creacion DESC
            LIMIT 1;`
            
            const [result] = await connection.promise().query(query, [id]);
            console.log("reservas del espacio", result);

            if (result.length === 0) {
                throw new Error("No se encontro una reserva para el espacio");
            }

            return result;
        } catch (error) {
            console.log("Error en obtener la reserva del espacio", error);
            throw error;
        }
    }

    static async historialUsuario(id) {
        const query = `SELECT * FROM reserva where id_documento = ? ORDER BY fecha_hora_entrada DESC;`

        try {
            const [rows] = await connection.promise().query(query, [id]);
            console.log("historial reservas", rows);
            return rows;
        } catch (err) {
            console.error("Error al obtener el historial", err);
            throw err;
        }
    }

    static async reservaActual(id) {
        const query = `SELECT * FROM reserva WHERE id_documento = ? ORDER BY fecha_creacion DESC LIMIT 1;`;

        try {
            const [rows] = await connection.promise().query(query, [id]);
            console.log("reserva actual", rows);
            return rows;
        } catch (err) {
            console.error("Error al obtener la reserva actual", err);
            throw err;
        }
    }

    static async reservasDiarias() {
        const query = `SELECT DATE(fecha_hora_entrada) AS dia, COUNT(*) AS total
                       FROM reserva WHERE estado = 'finalizada'
                       GROUP BY DATE(fecha_hora_entrada) 
                       ORDER BY dia ASC;`
        
        try {
            const [rows] = await connection.promise().query(query);
            console.log("reservas diarias", rows);
            return rows;
        } catch (err) {
            console.error("Error al obtener las reservas diarias", err);
            throw err;
        }
    }

    static async tipoVehiculo() {
        const query = `SELECT v.tipo_vehiculo, COUNT(*) AS total
                       FROM reserva r 
                       JOIN vehiculo v ON r.vehiculo_placa = v.placa
                       WHERE r.estado = 'finalizada'
                       GROUP BY v.tipo_vehiculo
                       ORDER BY total DESC;`;

        try {
            const [rows] = await connection.promise().query(query);
            console.log("tipo vehiculo", rows);
            return rows;
        } catch (err) {
            console.error("Error al obtener el tipo de vehiculo", err);
            throw err;
        }
    }

    static async obtenerPuestoUsados() {
        const query = `SELECT p.numero_espacio, COUNT(*) AS veces_usado
                       FROM reserva r
                       JOIN parqueadero p ON r.puesto_asignado = p.id_parqueadero
                       WHERE r.estado = 'finalizada'
                       GROUP BY r.puesto_asignado
                       ORDER BY veces_usado DESC
                       LIMIT 5;`;

        try {
            const [rows] = await connection.promise().query(query);
            console.log("puestos mas usados", rows);
            return rows;
        } catch (err) {
            console.error("Error al obtener los puestos mas usados", err);
            throw err;
        }
    }

    static async usuariosFrecuentes() {
        const query = `SELECT u.nombre, u.apellido, COUNT(*) AS total_reservas
                       FROM reserva r 
                       JOIN usuario u ON r.id_documento = u.id_documento
                       WHERE r.estado = 'finalizada'
                       GROUP BY r.id_documento
                       ORDER BY total_reservas DESC
                       LIMIT 5;`;

        try {
            const [rows] = await connection.promise().query(query);
            console.log("usuarios frecuentes", rows);
            return rows;
        } catch (err) {
            console.error("Error al obtener los usuarios frecuentes", err);
            throw err;
        }
    }
}

export default Reserva;