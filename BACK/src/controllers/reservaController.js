import Reserva from "../models/reserva.js";

const crearReserva = async (req, res) => {
    try {
        const { fecha_creacion, estado, fecha_hora_entrada, 
            fecha_hora_salida, puesto_asignado, 
            id_documento, vehiculo_placa } = req.body;
        
        if (!fecha_creacion || !estado || !fecha_hora_entrada || !puesto_asignado || !id_documento || !vehiculo_placa) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        //Verificar si el puesto esta ocupado
        const ocupado = await Reserva.verificarPuesto(puesto_asignado);
        if (ocupado) {
            return res.status(400).json({ message: "El puesto ya esta ocupado" });
        }


        //Crear la reserva
        const crearReserva = new Reserva({ fecha_creacion: fecha_creacion, estado: estado, fecha_hora_entrada: fecha_hora_entrada, fecha_hora_salida: fecha_hora_salida, puesto_asignado: puesto_asignado, id_documento: id_documento, vehiculo_placa: vehiculo_placa });
        const result = await crearReserva.crearReserva();
        res.status(200).json({ message: "Reserva creada", result });
    } catch (err) {
        console.error("Error al crear la reserva: ", err);
        res.status(500).json({ message: "Error al crear la reserva" })
    }
};

export default {
    crearReserva,
}