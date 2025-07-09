import connection from "../db/connection.js";

class parqueadero {
    constructor({ id_parqueadero, tipo_parqueadero, numero_espacio, disponibilidad, estado }) {
        this.id_parqueadero = id_parqueadero;
        this.tipo_parqueadero = tipo_parqueadero;
        this.numero_espacio = numero_espacio;
        this.disponibilidad = disponibilidad;
        this.estado = estado;
    }

    static async obtenerEspacios() {
        const query = 'select id_parqueadero, tipo_parqueadero, numero_espacio, disponibilidad from parqueadero';
        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async actualizarDisponibilidad(estado, id_parqueadero) {
        const query = `UPDATE parqueadero SET disponibilidad = ? WHERE id_parqueadero = ?`;
        
        try {
            const [result] = await connection.promise().query(query, [estado, id_parqueadero]);
            return result;
        } catch (err) {
            console.error("Error al actualizar la disponibilidad", err);
            throw err;
        }
    }

    static async espaciosReservados() {
        const query = `SELECT r.id_reserva, r.fecha_creacion, r.fecha_hora_entrada, p.numero_espacio, p.tipo_parqueadero, p.disponibilidad, r.estado AS estado_reserva, u.nombre, u.apellido, u.id_documento, v.placa AS vehiculo_placa
                       FROM parqueadero p
                       JOIN reserva r ON r.puesto_asignado = p.id_parqueadero
                       JOIN usuario u ON u.id_documento = r.id_documento
                       JOIN vehiculo v ON v.placa = r.vehiculo_placa
                       WHERE r.estado IN ('pendiente', 'aceptada');`;

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch (err) {
            console.error("Error al obtener los espacios reservados", err);
            throw err;
        }
    }
}

export default parqueadero;