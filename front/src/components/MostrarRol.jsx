import { useEffect, useState } from "react";

const MostrarRol = ({ rolesPermitidos = [], children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const obtenerSesion = async () => {
            try {
                //
                const response = await fetch("https://hnp5ds36-4000.use2.devtunnels.ms/api/verificarSesion", {
                    credentials: "include",
                });

                const data = await response.json();
                setUsuario(data);
                console.log("usuario obtenido:", data);
            } catch (error) {
                console.error("Error obteniendo la sesion:", error);
            }
        };

        obtenerSesion();
    }, []);

    if (!usuario) return null;

    return rolesPermitidos.includes(usuario.user.rol) ? children : null;
};

export default MostrarRol;