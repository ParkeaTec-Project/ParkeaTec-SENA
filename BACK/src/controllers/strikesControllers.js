import Strike from "../models/strikes.js";

const registarStrike = async (req, res) => {
    try {
        const {
            id_usuario,
            id_vehiculo,
            id_reserva,
            descripcion,
            id_novedad,
        } = req.body;

        console.log("prueba registrar strike", id_usuario, id_vehiculo, id_reserva, descripcion, id_novedad)

        const id_vigilante = req.user.id;

        if (!id_usuario || !id_vehiculo || !descripcion || !id_novedad) {
            return res.status(400).json({
                success: false,
                message: "Datos incompletos el id_usuario, id_vehiculo, descripcion e id_novedad son requeridos"
            })
        }

        const registrarStrike = new Strike({
            id_usuario,
            id_vehiculo,
            id_vigilante,
            id_reserva,
            descripcion,
        });

        const result = await registrarStrike.registarStrike();

        await Strike.aprobarNovedad(id_novedad, "aprobado");

        res.status(200).json({ message: "Strike registrado y novedad actualizada", result });
    } catch (error) {
        console.error("Error al registrar el strike y actualizar la novedad", error);
        res.status(500).json({ message: "Error al registrar el strike" });
    }
}

const rechazarNovedad = async (req, res) => {
    try {
        const { id_novedad } = req.body;

        if (!id_novedad) {
            return res.status(400).json({
                success: false,
                message: "Datos incompletos se necesita id_novedad"
            });
        }

        await Strike.rechazarNovedad(id_novedad, "rechazado");
        res.status(200).json({ message: "novedad rechazada" });
    } catch (error) {
        console.error("Error al rechazar la novedad");
        res.status(500).json({ message: "Error al rechazar la novedad" });
    }
}

const registroNovedadStrike = async (req, res) => {
    try {
        const {
            id_usuario,
            id_vehiculo,
            id_reserva,
            descripcion
        } = req.body;

        const id_vigilante = req.user.id;

        if (!id_usuario || !id_vehiculo || !descripcion) {
            return res.status(400).json({
                success: false,
                message: "Datos incompletos el id_usuario, id_vehiculo y descripcion son requeridos"
            });
        }

        const novedad = new Strike({
            id_usuario,
            id_vehiculo,
            id_vigilante,
            id_reserva,
            descripcion
        });

        const result = await novedad.registroNovedadStrike();

        res.status(200).json({ message: "Novedad registrada correctamente", result });
    } catch (error) {
        console.error("Error al registrar la novedad", error);
        res.status(500).json({ message: "Error interno al registar la novedad" });
    }
};

const obtenerNovedadesStrike = async (req, res) => {
    try {
        const id_vigilante = req.user.id;

        const obtenerNovedades = await Strike.obtenerNovedadesStrike(id_vigilante);
        console.log("obtener novedades", obtenerNovedades);

        res.status(200).json({
            message: "novedades obtenidas",
            data: obtenerNovedades
        });
    } catch (error) {
        console.error("Error al obtener las novedades", error.message);

        if (error.message.includes("No se encontraron novedades")) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno" });
    }
}

const verNovedades = async (req, res) => {
    try {
        const verNovedades = await Strike.verNovedades();
        console.log("obtener novedades general", verNovedades);

        res.status(200).json({
            message: "novedades obtenidas",
            data: verNovedades
        });
    } catch (error) {
        console.error("Error al obtener las novedades", error.message);

        if (error.message.includes("No se encontraron novedades")) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno" });
    }
}

const obtenerStrikesUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const obtenerStrikes = await Strike.obtenerStrikesUsuario(id_usuario);
        console.log("obtener strikes usuario", obtenerStrikes);

        res.status(200).json({
            message: "strikes obtenidos",
            data: obtenerStrikes
        });
    } catch (error) {
        console.error("Error al obtener los strikes", error.message);

        if (error.message.includes("No se encontraron strikes")) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno" });
    }
} 

export default {
    registarStrike,
    registroNovedadStrike,
    obtenerNovedadesStrike,
    obtenerStrikesUsuario,
    verNovedades,
    rechazarNovedad,
}