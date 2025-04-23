import { useEffect, useState } from "react";

const MostrarRol = ({ rolesPermitidos = [], children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const obtenerSesion = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/verificarSesion", {
                    credentials: "include",
                });

                const data = await response.json();
                setUsuario(data);
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