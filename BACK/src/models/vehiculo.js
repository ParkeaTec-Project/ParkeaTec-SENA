import connection from "../db/connection.js";

class Vehiculo {
    constructor({ placa, tipo_vehiculo, modelo, marca, color, foto_placa_vehiculo, foto_serial, foto_vehiculo, foto_licencia_conducir, foto_tarjeta_propiedad, foto_soat, foto_tecnomecanica, vencimiento_soat, observacion,
        id_documento, id_tipo_vehiculo }) {
        this.placa = placa;
        this.tipo_vehiculo = tipo_vehiculo;
        this.modelo = modelo;
        this.marca = marca;
        this.color = color;
        this.foto_placa_vehiculo = foto_placa_vehiculo;
        this.foto_serial = foto_serial;
        this.foto_vehiculo = foto_vehiculo;
        this.foto_licencia_conducir = foto_licencia_conducir;
        this.foto_tarjeta_propiedad = foto_tarjeta_propiedad;
        this.foto_soat = foto_soat;
        this.foto_tecnomecanica = foto_tecnomecanica;
        this.vencimiento_soat = vencimiento_soat;
        this.observacion = observacion;
        this.id_documento = id_documento;
        this.id_tipo_vehiculo = id_tipo_vehiculo;
    }

    async RegistroVehiculo() {
        try {
            const query = `INSERT INTO vehiculo (placa, tipo_vehiculo, modelo, marca, color, foto_placa, foto_serial, foto_vehiculo, foto_licencia_conducir, foto_tarjeta_propiedad, foto_soat, foto_tecnomecanica, vencimiento_soat, observacion,
            id_documento, id_tipo_vehiculo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await connection.promise().query(query, [this.placa, this.tipo_vehiculo, this.modelo, this.marca, this.color, this.foto_placa_vehiculo, this.foto_serial, this.foto_vehiculo,this.foto_licencia_conducir, this.foto_tarjeta_propiedad, this.foto_soat, this.foto_tecnomecanica, this.vencimiento_soat, this.observacion, this.id_documento, this.id_tipo_vehiculo]);
            if (result.affectedRows === 0) {
                throw new Error("Error al hacer el registro de formulario");
            }

            return result;
        } catch (error) {
            console.error("Error al registrar formulario", error);
            throw error;
        }
    }

    static async obtenerVehiculoId(id) {
        try {
            const query = 'select * from vehiculo where id_documento = ?';

            const [result] = await connection.promise().query(query, [id]);

            if (result.length === 0) {
                throw new Error(`vehiculo de usuario no encontrado con id ${id}`);
            }

            return result;
        } catch (error) {
            console.error(`Error al obtener el vehiculo de usuario con id ${id}`);
            throw error;
        }
    }

    async actualizarVehiculoId() {
        try {
            const checkQuery = 'select * from vehiculo where id_documento = ?';
            const [checkResult] = await connection.promise().query(checkQuery, [this.id_documento]);

            if (checkQuery[0].length === 0) {
                throw new Error(`Vehiculo de usuario no encontado con id ${this.id_documento}`);
            }

            const query = 'update vehiculo set color = ?, observacion = ?, foto_vehiculo = ? where id_documento = ?';
            const [result] = await connection.promise().query(query, [this.color, this.observacion, this.foto_vehiculo, this.id_documento]);

            if (result.length === 0) {
                throw new Error(`Error al actualizar el vehiculo de usuario con id ${this.id_documento}`);
            }

            return result;
        } catch (error) {
            console.error("Error en actualizar el vehiculo", error);
            throw error;
        }
    }

    static async borrarVehiculoId(id) {
        if (!id) {
            throw new Error("ID de vehiculo invalido");
        }

        try {
            const checkQuery = 'SELECT * FROM vehiculo WHERE placa = ?';
            const [checkResult] = await connection.promise().query(checkQuery, [id]);

            if (checkResult[0].length === 0) {
                throw new Error(`Vehiculo no encontrado con placa ${id}`);
            }

            const query = 'DELETE FROM vehiculo WHERE placa = ?';
            const [result] = await connection.promise().query(query, [id]);

            if (result.affectedRows === 0) {
                throw new Error(`No se pudo eliminar el vehiculo con placa ${id}`);
            }

            return result;
        } catch (error) {
            console.error(`Error al borrar el vehiculo con placa ${id}`);
            throw error;
        }
    }
}

export default Vehiculo;