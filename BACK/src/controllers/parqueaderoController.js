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

export default {
    obtenerEspacios,
};