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
        //const queryCheck = `SELECT COUNT(*) AS count FROM reserva WHERE puesto_asignado = ? AND estado IN ('confirmada', 'pendiente')`;
        const queryCheck = `SELECT COUNT(*) AS count FROM reserva WHERE puesto_asignado = ?`;
        //const queryCheck = `SELECT COUNT(*) AS count FROM reserva WHERE puesto_asignado = ?`;
    
        try {
            const [rows] = await connection.promise().query(queryCheck, [puesto_asignado]);
            console.log("🔎 Puesto ocupado:", rows);
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
}

export default Reserva;