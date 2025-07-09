import Parqueadero from "../models/parqueadero.js";

const obtenerEspacios = async (req, res) => {
    try {
        const espacios = await Parqueadero.obtenerEspacios();

        if (Object.keys(espacios).length === 0) {
            res.status(404).send("No existen espacios");
        }
        res.status(200).json(espacios);
    } catch (err) {
        res.status(500).send("Error al obtener los espacios");
    }
};

const espaciosReservados = async (req, res) => {
    try {
        const espaciosReservados = await Parqueadero.espaciosReservados();

        if (espaciosReservados.length === 0) {
            return res.status(400).json({ message: "No hay espacios reservados u ocupados" });
        } else {
            return res.status(200).json({ message: "Espacios reservados u ocupados", data: espaciosReservados });
        }
    } catch (err) {
        console.error("Error al obtener los espacios reservados", err);
        return res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export default {
    obtenerEspacios,
    espaciosReservados,
};