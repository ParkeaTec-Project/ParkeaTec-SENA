import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function VerReservas() {
    const [reserva, setReserva] = useState([]);
    const [sesion, setSesion] = useState(null);

    useEffect(() => {
        const obtenerSesion = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/verificarSesion", {
                    credentials: "include",
                });

                const data = await response.json();
                setSesion(data);
            } catch (err) {
                console.error("Ocurrio un error al obtener la sesion", err);
            }
        };

        obtenerSesion();
    }, []);

    useEffect(() => {
        if (!sesion || !sesion.user?.id) return;

        const obtenerReserva = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/obtenerReservas/${sesion.user.id}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Error al obtener la reserva");
                }

                const data = await response.json();
                console.log("reservas usuario", data.data);
                setReserva(data.data);
            } catch (err) {
                console.error("Error: ", err);
            }
        };
        obtenerReserva();
    }, [sesion]);

    const cancelarReserva = async (id) => {
        console.log("id reserva", id);
        try {
            const response = await fetch(`http://localhost:4000/api/cancelarReserva/${id}`, {
                method: "PUT"
            });

            if (response.ok) {
                setReserva((prev) => 
                    prev.map((res) => 
                        res.id_reserva === id ? { ...res, estado: "cancelada" } : res
                    )
                ); 
                toast.success("Reserva cancelada correctamente")
            } else {
                toast.error("Ocurrio un error inesperado")
                console.error("Error al cancelar la reserva");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };
    
    return (
        <div>
  <h2>Reservas</h2>

  {reserva.length === 0 ? (
    <p>No hay reservas</p>
  ) : (
    reserva.map((reserva) => (
      <div
        key={reserva.id_reserva}
        className="border m-3 p-3 rounded shadow-sm"
      >
        <p><strong>Id reserva:</strong> {reserva.id_reserva}</p>
        <p><strong>Espacio:</strong> {reserva.numero_espacio}</p>
        <p><strong>Fecha creación:</strong> {reserva.fecha_creacion}</p>
        <p><strong>Estado:</strong> {reserva.estado}</p>
        <p><strong>Fecha hora entrada:</strong> {reserva.fecha_hora_entrada}</p>
        <p><strong>Fecha hora salida:</strong> {reserva.fecha_hora_salida}</p>
        <p><strong>Documento usuario:</strong> {reserva.id_documento}</p>
        <p><strong>Vehículo:</strong> {reserva.vehiculo_placa}</p>

        <button
          onClick={() => cancelarReserva(reserva.id_reserva)}
          disabled={reserva.estado.toLowerCase() === "cancelada"}
          className={`btn ${reserva.estado.toLowerCase() === "cancelada" ? "btn-secondary" : "btn-danger"} mt-2`}
        >
          Cancelar reserva
        </button>
      </div>
    ))
  )}
  <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
</div>
    )
    
}

export default VerReservas;