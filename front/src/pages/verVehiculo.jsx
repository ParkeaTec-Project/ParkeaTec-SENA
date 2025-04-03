import React, { useState, useEffect } from "react";

function VerVehiculo() {
    const [sesion, setSesion] = useState(null);
    const [vehicleData, setVehicleData] = useState({
        placa: "",
        tipo_vehiculo: "",
        modelo: "",
        marca: "",
        color: "",
        foto_placa: "",
        foto_serial: "",
        foto_vehiculo: "",
        foto_licencia_conducir: "",
        foto_tarjeta_propiedad: "",
        foto_soat: "",
        foto_tecnomecanica: "",
        vencimiento_soat: "",
        observacion: "",
        id_documento: "",
        id_tipo_vehiculo: ""
    });

    useEffect(() => {
        const obtenerSesion = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/verificarSesion",
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();
                console.log("dato verificar sesion", data);
                setSesion(data);
            } catch (err) {
                console.error("Ocurrio un error al obtener la sesion", err);
            }
        };

        obtenerSesion();
    }, []);

    useEffect(() => {
        const obtenerVehiculo = async () => {
            if(!sesion?.user?.id) return;
            console.log("prueba sesion vehiculo", sesion.user.id);
            try {
                // ruta obtener vehiculo
                const response = await fetch(`http://localhost:4000/api/verVehiculo/${sesion.user.id}`, 
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Error al obtener el vehiculo");
                }

                const data = await response.json();
                console.log("dato Vehiculo", data);
                setVehicleData(data);
                console.log(vehicleData);
            } catch (err) {
                console.error("Error:", err)
            }
        };

        if (sesion) {
            obtenerVehiculo();
        }
    }, [sesion]);
}

export default VerVehiculo;