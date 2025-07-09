import Reserva from "../models/reserva.js";
import Parqueadero from "../models/parqueadero.js"

const crearReserva = async (req, res) => {
    try {
        const { 
            fecha_creacion, 
            estado, 
            fecha_hora_entrada, 
            fecha_hora_salida,
            puesto_asignado, 
            id_documento, 
            vehiculo_placa 
        } = req.body;
        
        if (!fecha_creacion || !estado || !puesto_asignado || !id_documento || !vehiculo_placa) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        //Verificar si el puesto esta ocupado
        const ocupado = await Reserva.verificarPuesto(puesto_asignado);
        if (ocupado) {
            return res.status(400).json({ message: "El puesto ya esta ocupado" });
        }

        const reservaActiva = await Reserva.obtenerReserva(vehiculo_placa);
        if (reservaActiva) {
            return res.status(400).json({ message: "El vehiculo ya tiene una reserva activa, pendiente o aceptada" });
        }

        //falta validacion de si el usuario ya esta usando el parqueadero no permitir hacer 
        //la reserva si no hasta que finalize su reserva o cuando salga del parqueadero

        //Crear la reserva
        const crearReserva = new Reserva({ fecha_creacion: fecha_creacion, estado: estado, fecha_hora_entrada: fecha_hora_entrada, fecha_hora_salida: fecha_hora_salida, puesto_asignado: puesto_asignado, id_documento: id_documento, vehiculo_placa: vehiculo_placa });
        const result = await crearReserva.crearReserva();
        
        await Parqueadero.actualizarDisponibilidad("reservado", puesto_asignado);

        res.status(200).json({ message: "Reserva creada", result });
    } catch (err) {
        console.error("Error al crear la reserva: ", err);
        res.status(500).json({ message: "Error al crear la reserva" })
    }
};

const verificarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID_DOCUMENTO", id);
        //verificar si el usuario no tiene mas reservas
        const verificarReserva = await Reserva.verificarReserva(id);
        console.log("verificarReserva", verificarReserva);
        if (verificarReserva) {
            return res.status(400).json({ message: "Ya tienen una reserva activa o pendiente" });
        } else {
            return res.status(200).json({ message: "No tienes reservas activas. Puedes reservar" })
        }
    } catch (error) {
        console.error("Error al verificar la reserva: ", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

const obtenerReservas = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id reserva", id);
        const obtenerReserva = await Reserva.obtenerReservas(id);
        console.log("reservas", obtenerReserva);
        if (obtenerReserva.length === 0) {
            return res.status(400).json({ message: "No tienes reservas"});
        } else {
            return res.status(200).json({ message: "Reservas obtenidas", data: obtenerReserva });
        }
    } catch (error) {
        console.error("Error al obtener la reserva: ", error);
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

const obtenerReservaActiva = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id reserva activa", id);
        const obtenerReservaActiva = await Reserva.obtenerReservaActiva(id);
        console.log("reserva activa", obtenerReservaActiva);

        if (obtenerReservaActiva.length === 0) {
            return res.status(400).json({ message: "No tienes reserva activas" });
        } else {
            return res.status(200).json({ message: "Reserva activa obtenida", data: obtenerReservaActiva });
        }
    } catch (error) {
        console.error("Error al obtener la reserva:", error);
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

const cancelarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id reserva", id);
        if (!id || !/^\d+$/.test(id)) {
            return res.status(400).json({ message: "Falta id de la reserva" })
        }

        const cancelarReserva = await Reserva.cancelarReserva(id);
        console.log("cancelarReserva", cancelarReserva);
        res.status(200).json({ 
            message: "Reserva cancelada", 
            data: {
                id_reserva: cancelarReserva.result,
                id_parqueadero: cancelarReserva.resultEspacio
            }
        });
    } catch (error) {
        console.error("Error al cancelar la reserva:", error.message);
        
        if (error.message.includes("No se encontro una reserva")) {
            return res.status(404).json({ message: error.message })
        }

        res.status(500).json({ message: "Error interno" });
    }
}

const aceptarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id reserva", id);

        if (!id || !/^\d+$/.test(id)) {
            return res.status(400).json({ message: "Falta id de la reserva" })
        }

        const aceptarReserva = await Reserva.aceptarReserva(id);
        console.log("aceptarReserva", aceptarReserva);

        res.status(200).json({
            message: "Reserva aceptada",
            data: {
                id_reserva: aceptarReserva.result,
                id_parqueadero: aceptarReserva.resultEspacio
            }
        });
    } catch (error) {
        console.error("Error al aceptar la reserva:", error.message);

        if (error.message.includes("No se encontro ninguna reserva")) {
            return res.status(404).json({ message: error.message })
        }

        res.status(500).json({ message: "Error interno" });
    }
}

const finalizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id reserva", id);

        if (!id || !/^\d+$/.test(id)) {
            return res.status(400).json({ message: "Fata id de la reserva" });
        }

        const finalizarReserva = await Reserva.finalizarReserva(id);
        console.log("finalizar reserva", finalizarReserva);

        res.status(200).json({
            message: "Reserva finalizada",
            data: {
                id_reserva: finalizarReserva.result,
                id_parqueadero: finalizarReserva.resultEspacio
            }
        });
    } catch (error) {
        console.error("Error al aceptar la reserva:", error.message);

        if (error.message.includes("No se encontro una reserva")) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno" });
    }
}

const obtenerReservaEspacio = async (req, res) => {
    try {
        const { id } = req.params;

        const obtenerReservaEspacio = await Reserva.obtenerReservaEspacio(id);
        console.log("obtener reserva del espacio", obtenerReservaEspacio);

        res.status(200).json({
            message: "reserva de espacio obtenida",
            data: obtenerReservaEspacio,
        });
    } catch (error) {
        console.error("Error al obtener la reserva del espacio", error.message);

        if (error.message.includes("No se encontro una reserva")) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno" });
    }
}

const historialUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id usuario", id);
        const obtenerHistorial = await Reserva.historialUsuario(id);
        console.log("historial", obtenerHistorial);

        if (obtenerHistorial.length === 0) {
            return res.status(400).json({ message: "No tiene ningun historial" });
        } else {
            return res.status(200).json({ message: "Historial obtenido", data: obtenerHistorial });
        }
    } catch (error) {
        console.error("Error al obtener el historial", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

const reservaActual = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const reservaActual = await Reserva.reservaActual(id);
        console.log("reserva actual", reservaActual);

        if (reservaActual.length === 0) {
            return res.status(400).json({ message: "No tienes reseras actuales" });
        } else {
            return res.status(200).json({ message: "Reserva actual", data: reservaActual });
        }
    } catch (error) {
        console.error("Error al obtener la reserva actual", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

const reservasDiarias = async (req, res) => {
    try {
        const reservasDiarias = await Reserva.reservasDiarias();
        console.log("reservas diarias", reservasDiarias);

        if (reservasDiarias.length === 0) {
            return res.status(400).json({ message: "No hay reservas" });
        } else {
            return res.status(200).json({ message: "Reservas diarias", data: reservasDiarias });
        }
    } catch (error) {
        console.error("Error al obtener las reservas diarias", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

const tipoVehiculo = async (req, res) => {
    try {
        const tipoVehiculo = await Reserva.tipoVehiculo();
        console.log("tipo vehiculo", tipoVehiculo);

        if (tipoVehiculo.length === 0) {
            return res.status(400).json({ message: "No hay vehiculos" });
        } else {
            return res.status(200).json({ message: "Tipos de vehiculos", data: tipoVehiculo });
        }
    } catch (error) {
        console.error("Error al obtener los tipos de vehiuculos", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
    
}

const obtenerPuestoUsados = async (req, res) => {
    try {
        const puestosUsados = await Reserva.obtenerPuestoUsados();
        console.log("puestos usados", puestosUsados);

        if (puestosUsados.length === 0) {
            return res.status(400).json({ message: "No hay puestos usados" });
        } else {
            return res.status(200).json({ message: "puestos usados", data: puestosUsados });
        }
    } catch (error) {
        console.error("Errro al obtener los puestos usados", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

const usuariosFrecuentes = async (req, res) => {
    try {
        const usuariosFrecuentes = await Reserva.usuariosFrecuentes();
        console.log("usuarios frecuentes", usuariosFrecuentes);

        if (usuariosFrecuentes.length === 0) {
            return res.status(400).json({ message: "No hay usuarios" });
        } else {
            return res.status(200).json({ message: "usuarios frecuentes", data: usuariosFrecuentes });
        }
    } catch (error) {
        console.error("Error al obtener los usuarios frecuentes", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export default {
    crearReserva,
    verificarReserva,
    obtenerReservas,
    obtenerReservaActiva,
    cancelarReserva,
    aceptarReserva,
    finalizarReserva,
    obtenerReservaEspacio,
    historialUsuario,
    reservaActual,
    reservasDiarias,
    tipoVehiculo,
    obtenerPuestoUsados,
    usuariosFrecuentes,
}