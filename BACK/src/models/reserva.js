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
        const query = `SELECT COUNT(*) AS count FROM reserva WHERE vehiculo_placa = ? AND estado IN ('activa', 'pendiente');`

        try {
            const [rows] = await connection.promise().query(query, [placa]);
            console.log("rows", rows);
            return rows[0].count > 0;;
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
            console.log("Error en la transaccion la cancelacion", error);
            throw error;
        }
    }
}

export default Reserva;