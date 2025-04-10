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
}

export default parqueadero;