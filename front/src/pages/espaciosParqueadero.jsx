import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function EspaciosParqueadero() {
    const [espacios, setEspacios] = useState([]);

    const obtenerEspacios = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/espacios", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Espacios obtenidos:", data);
                setEspacios(data);
            }
        } catch (error) {
            console.log("Error al obtener los espacios:", error.message);
        }
    };

    useEffect(() => {
        obtenerEspacios();
    }, []);

    const infoEspacio = (espacio) => {
        console.log("Espacio Seleccionado:", espacio)
    };

    return (
        <div>
            { espacios.map((espacio) => (
                <button key={espacio.id_parqueadero} onClick={() => infoEspacio(espacio)}>{espacio.numero_espacio}</button>
            )) }
        </div>
    )
}

export default EspaciosParqueadero;