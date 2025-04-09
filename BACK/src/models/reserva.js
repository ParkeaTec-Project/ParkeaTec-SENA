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
            console.log("Puesto ocupado:", rows);
            return rows[0].count > 0; // Devuelve true si el puesto esta ocupado
        } catch (err) {
            console.error("Error al verificar el puesto ocupado:", err);
            throw err;
        }
    }

    static async verificarReserva(id) {
        console.log("Verificando id_documento:", id);
        const query = `SELECT COUNT(*) AS count FROM reserva where id_documento = ? AND estado IN ('activa', 'pendiente')`;

        try {
            const [rows] = await connection.promise().query(query, [id]);
            console.log("Rows", rows);
            return rows[0].count > 0;
        } catch (err) {
            console.error("Error al verificar reserva activa", err);
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

    static async cancelarReserva(id) {
        try {
            const query = `UPDATE reserva SET estado = 'cancelada' WHERE id_reserva = ?`;
            const [result] = await connection.promise().query(query, [id]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se encontro ninguna reserva");
            }

            return result;
        } catch (error) {
            console.log("Error al cancelar la reserva", error);
            throw error;
        }
    }
}

export default Reserva;