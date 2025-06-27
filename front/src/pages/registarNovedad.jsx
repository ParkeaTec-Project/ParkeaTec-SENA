import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RegistroNovedad() {
    const { state } = useLocation(); //datos que fueron pasados desde la vista de espaciosParqueadero
    const navigate = useNavigate();

    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!descripcion.trim()) {
            alert("La descripcion es requerida");
            return;
        }

        const datos ={
            id_usuario: state?.id_usuario,
            id_vehiculo: state?.id_vehiculo,
            id_reserva: state?.id_reserva,
            descripcion,
        };

        try {
            const response = await fetch('https://hnp5ds36-4000.use2.devtunnels.ms/api/registroNovedadStrike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(datos),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message || "Error al registrar la novedad");
            }
        } catch (error) {
            console.error("Error en el fetch", error);
            alert("Hubo un error al registrar la novedad");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Registrar Novedad</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Descripion de la novedad</label>
                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows={4}
                        required
                    >
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Enviar novedad
                </button>
            </form>
        </div>
    )
}

export default RegistroNovedad;