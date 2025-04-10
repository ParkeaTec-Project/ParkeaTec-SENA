import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/espacioParqueadero.module.css";

function EspaciosParqueadero() {
  const navigate = useNavigate();
  const [sesion, setSesion] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [espacios, setEspacios] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  console.log("espacio seleccionado set", espacioSeleccionado);
  //console.log("espacio seleccionado set2", espacioSeleccionado.numero_espacio)
  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/verificarSesion",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("dato sesion parqueader", data);
        setSesion(data);
      } catch (err) {
        console.error("Ocurrio un error al obtener la sesion", err);
      }
    };
    obtenerSesion();
  }, []);
  console.log("sesion parqueader", sesion);

  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/verVehiculo/${sesion.user.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 404) {
            console.warn("No se encontro vehiculo para el usuario");
            setShowModal(true);
            return;
        }

        if (!response.ok) {
          throw new Error("Error al obtener el vehiculo");
        }
        console.log("data");
        const data = await response.json();
        console.log("dato vehiculo modal", data);
        
        if (data?.vehiculo && Object.keys(data?.vehiculo).length > 0) {
          setVehiculo(data.vehiculo);
        } else {
          setShowModal(true);
        }
        console.log("dato vehiculo parqueadero", data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    if (sesion?.user?.id) {
        obtenerVehiculo();
    }
   
  }, [sesion]);

  const obtenerEspacios = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/espacios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  // const infoEspacio = (espacio) => {
  //     console.log("Espacio Seleccionado:", espacio)
  //     console.log("Espacio disponibilidad", espacio.disponibilidad);
  //     setEspacioSeleccionado(espacio);
  // };

  const colorEstado = {
    ocupado: "bg-danger",
    libre: "bg-success",
    reservado: "bg-warning",
  };

  const obtenerColor = (estado) => colorEstado[estado] || "bg-secondary";

  const realizarReserva = async () => {
    if (!espacioSeleccionado) {
        console.warn("No se ha seleccionado un espacio");
        return;
    }
    const reserva = {
      fecha_creacion: new Date(),
      estado: "pendiente",
      fecha_hora_entrada: null,
      fecha_hora_salida: null,
      puesto_asignado: espacioSeleccionado.id_parqueadero,
      id_documento: sesion.user.id,
      vehiculo_placa: vehiculo.placa,
    };
    try {
      const response = await fetch("http://localhost:4000/api/crearReserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Reserva realizada");
        setEspacioSeleccionado(null);
        obtenerEspacios();
      } else {
        alert("Error al realizar la reserva.", data.message);
      }
    } catch (err) {
      console.log("Error al hacer la reserva", err);
    }
  };

  return (
    <section className={styles.section}>
      <div>
        {espacios.map((espacio) => (
          <button
            key={espacio.id_parqueadero}
            className={`text-white fw-bold text-center rounded shadow ${obtenerColor(
              espacio.disponibilidad
            )}`}
            onClick={() => {
                if (vehiculo?.placa) {
                    setEspacioSeleccionado(espacio)
                } else {
                    setShowModal(true);
                }
            }}
            style={{
                backgroundColor: vehiculo?.placa ? "" : "gray",
                opacity: vehiculo?.placa ? 1 : 0.5,
                cursor: vehiculo?.placa ? "pointer": "not-allowed"
            }}
          >
            {espacio.numero_espacio}
          </button>
        ))}
      </div>

      {espacioSeleccionado && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Reservar espacio {espacioSeleccionado.numero_espacio}
          </h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={realizarReserva}
          >
            Confirmar Reserva
          </button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registro requerido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Debes registrar un vehiculo antes de poder hacer una reserva de
            parqueadero
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/Formulario")}>
            Registrar vehiculo
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default EspaciosParqueadero;
