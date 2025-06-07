import Vehiculo from "../models/vehiculo.js";
import User from "../models/user.js";

const registroVehiculo = async (req, res) => {

    try {
        const { placa, tipo_vehiculo, modelo, marca, color, vencimiento_soat, observacion,
            id_documento, id_tipo_vehiculo } = req.body;
        
        console.log("tipo vehiculo", id_tipo_vehiculo);
        
        const { firma_usuario, foto_documento, foto_carnet, foto_placa_vehiculo, foto_serial, foto_vehiculo,
            foto_licencia_conducir, foto_tarjeta_propiedad,
            foto_soat, foto_tecnomecanica } = req.files;

        // const fotosUsuario = {
        //     firma_usuario: req.files.firma_usuario?.[0]?.filename,
        //     foto_documento: req.files.foto_documento?.[0]?.filename, 
        //     foto_carnet: req.files.foto_carnet?.[0]?.filename
        // }
        console.log("Campos recibidos:", {
            foto_placa_vehiculo,
            foto_serial,
            foto_vehiculo,
            foto_licencia_conducir,
            foto_tarjeta_propiedad,
            foto_soat,
            foto_tecnomecanica,
            firma_usuario,
            foto_documento,
            foto_carnet
          });

        if (id_tipo_vehiculo === 1) {
            if (!foto_placa_vehiculo || !foto_vehiculo || !foto_licencia_conducir || !foto_tarjeta_propiedad || !foto_soat || !foto_tecnomecanica) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
        } else if (id_tipo_vehiculo === 2) {
            if ( !foto_serial || !foto_vehiculo ) {
                return res.status(400).json({ message: "Falta la foto del serial" });
            }
        }
        
        const processFile = (field) => req.files?.[field]?.[0]?.filename || null;

        await User.actualizarFotos(
            id_documento, 
            processFile('firma_usuario'), 
            processFile('foto_documento'), 
            processFile('foto_carnet')
        )

        

        console.log("datos body", req.body);
        console.log("datos file", req.files);

        const registroForm = new Vehiculo({
            placa, 
            tipo_vehiculo, 
            modelo, 
            marca, 
            color, 
            foto_placa_vehiculo: processFile('foto_placa_vehiculo'), 
            foto_serial: processFile('foto_serial'), 
            foto_vehiculo: processFile('foto_vehiculo'), 
            foto_licencia_conducir: processFile('foto_licencia_conducir'),
            foto_tarjeta_propiedad: processFile('foto_tarjeta_propiedad'), 
            foto_soat: processFile('foto_soat'),
            foto_tecnomecanica: processFile('foto_tecnomecanica'), 
            vencimiento_soat,
            observacion, 
            id_documento, 
            id_tipo_vehiculo
        });

        console.log("registro form", registroForm);
        const result = await registroForm.RegistroVehiculo();
       

        res.status(201).json({ message: "Registro exitoso del vehiculo", data: result });
    } catch (error) {
        console.error("Error al hacer registro:", error);
        res.status(500).json({ message: error.message });
    }
}

const obtenerVehiculoId = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: "Id de usuario invalido" });
        }

        const vehiculo = await Vehiculo.obtenerVehiculoId(id);
        if (!vehiculo || vehiculo.length === 0) {
            throw new Error("Vehiculo de usuario no encontrado");
        }
        
        res.status(200).json({ message: "vehiculo obtenido", vehiculo: vehiculo[0] });
    } catch (error) {
        if (error.message.includes("vehiculo de usuario no encontrado")) {
            return res.status(404).json({ error: error.message });
        }
        console.error("Error al obtener vehículo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const actualizarVehiculoId = async (req, res) => {
    try {
        const { color, observacion } = req.body;
        //const foto_vehiculo = req.file?.filename;
        const id = req.params.id

        console.log("req body", req.body);
        console.log("req file", req.file);
        const vehiculoActual = (await Vehiculo.obtenerVehiculoId(id))[0];
        const foto_vehiculo = req.file?.filename || vehiculoActual.foto_vehiculo;

        if (!color && !observacion && !foto_vehiculo ) {
            return res.status(400).json({ message: "Debe enviar al menos un campo para actualizar" });
        }

        //const processFile = (field) => req.files?.[field]?.[0]?.filename;

        const camposActualizar = {};
        if (color) camposActualizar.color = color;
        if (observacion) camposActualizar.observacion = observacion;
        if (foto_vehiculo) camposActualizar.foto_vehiculo = foto_vehiculo;
        //console.log("process file", processFile)
        const updataVehiculo = new Vehiculo({
            color,
            observacion,
            foto_vehiculo,
            id_documento: id
        });
        console.log("update Vehiculo", updataVehiculo);
        const result = await updataVehiculo.actualizarVehiculoId();
        console.log("resultado", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }

        res.status(200).json({
            message: "Vehiculo actualizado correctamente", result,
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Erro al actualizar el vehiculo:", error);
        res.status(500).json({ message: error.message })
    }
};

const borrarVehiculoId = async (req, res) => {
    try {
        const vehiculoId = req.params.id;
        console.log("id vehiculo", vehiculoId);

        const deleteVehiculo = await Vehiculo.borrarVehiculoId(vehiculoId);
        res.status(200).json({ message: "Vehiculo eliminado", deleteVehiculo })

    } catch (error) {
        if (error.message.includes("Vehiculo no encontrado")) {
            return res.status(404).json({ message: error.message });
        }

        if (error.message.includes("ID de vehiculo invalido")) {
            return res.status(400).json({ message: error.message });
        }

        console.error("Error al eliminar el vehiculo:", error);
        res.status(500).json({ message: "Error interno" });
    }
}

export default {
    registroVehiculo,
    obtenerVehiculoId,
    actualizarVehiculoId,
    borrarVehiculoId
}