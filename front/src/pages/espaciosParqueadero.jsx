import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Badge, Container, Row, Col, Alert } from "react-bootstrap";
import styles from "../styles/espacioParqueadero.module.css";

function EspaciosParqueadero() {
  const navigate = useNavigate();
  const [sesion, setSesion] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [reservaActiva, setReservaActiva] = useState([]);
  const [showAceptarModal, setShowAceptarModal] = useState(false);
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [espacios, setEspacios] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  console.log("espacio seleccionado set", espacioSeleccionado);

  // Obtener la sesion del usuario
  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        const response = await fetch(
          "https://hnp5ds36-4000.use2.devtunnels.ms/api/verificarSesion",
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

  // Obtener el vehiculo del usuario para hacer validaciones y uso del parqueadero
  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
        const response = await fetch(
          `https://hnp5ds36-4000.use2.devtunnels.ms/api/verVehiculo/${sesion.user.id}`,
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

  // Consulta y trae todos los espacios del parqueadero
  const obtenerEspacios = async () => {
    try {
      const response = await fetch("https://hnp5ds36-4000.use2.devtunnels.ms/api/espacios", {
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

  //const obtenerColor = (estado) => colorEstado[estado] || "bg-secondary";

  // const obtenerColor = (estado) => {
  //   return estado === "libre" ? styles.disponible : styles.ocupado;
  // };

  const obtenerColor = (estado) => {
    const clases = {
      libre: styles.libre,
      reservado: styles.reservado,
      ocupado: styles.ocupado,
      no_disponible: styles.noDisponible
    };
    return clases[estado] || styles.libre;
  };

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
      const response = await fetch("https://hnp5ds36-4000.use2.devtunnels.ms/api/crearReserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("¡Reserva realizada con éxito!");
        setShowSuccessAlert(true);
        setEspacioSeleccionado(null);
        obtenerEspacios();

        setTimeout(() => {
          setShowSuccessAlert(false);
          setShowReservaModal(false);
        }, 3000);
      } else {
        setAlertMessage(data.message || "Error al realizar la reserva");
        setShowErrorAlert(true);
      }
    } catch (err) {
      console.log("Error al hacer la reserva", err);
      setAlertMessage("Error de conexión con el servidor");
      setShowErrorAlert(true);
    }
  };

  const obtenerReservaActiva = async (id) => {
    try {
      const response = await fetch(`https://hnp5ds36-4000.use2.devtunnels.ms/api/obtenerReservaActiva/${id}`);
      if (!response.ok) throw new Error("Error al obtener reserva activa");
      const data = await response.json();
      console.log("reserva activa-", data);
      setReservaActiva(data.data || []); // Guardamos en el estado
      return data.data; // También lo retornamos para usarlo en el onClick
    } catch (err) {
      console.error("Error al cargar la reserva activa", err);
      setReservaActiva([]);
      return [];
    }
  };

  const aceptarReserva = async (id) => {
    try {
      const response = await fetch(`https://hnp5ds36-4000.use2.devtunnels.ms/api/aceptarReserva/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fecha_hora_entrada: new Date().toISOString()
          })
        }
      )

      if (!response.ok) {
        throw new Error("Error al aceptar la reserva");
      } else {
        obtenerEspacios();
      }

      return await response.json();
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  const finalizarReserva = async (id) => {
    try {
      const response = await fetch(`https://hnp5ds36-4000.use2.devtunnels.ms/api/finalizarReserva/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_hora_salida: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error("Error al finalizar la reserva");
      } else {
        obtenerEspacios();
      }
      return await response.json();
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  const calcularTiempo = (fechaEntrada) => {
    if (!fechaEntrada) return "No registrado";
    const entrada = new Date(fechaEntrada);
    const ahora = new Date();
    const diff = Math.floor((ahora - entrada) / 1000 / 60);

    if (diff < 60) return `${diff} minutos`;
    const horas = Math.floor(diff / 60);
    const minutos = diff % 60;
    return `${horas}h ${minutos}m`;
  };

  const obtenerReservasPorEspacio = async (id) => {
    try {
      const response = await fetch(`https://hnp5ds36-4000.use2.devtunnels.ms/api/obtenerReservaEspacio/${id}`);
      if (!response.ok) throw new Error('Error al obtener reservas');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error", error);
      return [];
    }
  };

  useEffect(() => {
    if (sesion?.user?.id) {
      obtenerReservaActiva(sesion.user.id);
    }
  }, [sesion?.user?.id]);

  const NotificationAlert = ({ show, variant, message, onClose }) => (
    <div
      className={`position-fixed top-0 end-0 m-4 ${styles.notification}`}
      style={{
        transform: show ? "translateX(0)" : "translateX(200%)",
        transition: "transform 0.3s ease-out",
        zIndex: 9999,
      }}
    >
      <Alert variant={variant} onClose={onClose} dismissible>
        <div className="d-flex align-items-center">
          {variant === "success" ? (
            <i className="bi bi-check-circle-fill me-2 fs-4"></i>
          ) : (
            <i className="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
          )}
          <span>{message}</span>
        </div>
      </Alert>
    </div>
  );

  const reserva = reservaActiva?.[0];
  console.log("datos usuario novedad", reservaActiva[0]);
  console.log("espacio seleccionado-", espacioSeleccionado?.numero_espacio);
  console.log("espacio-", espacios);

  const vistaNovedad = () => {
    const datos = {
      id_usuario: reservaActiva[0]?.id_documento,
      id_vehiculo: reservaActiva[0]?.vehiculo_placa,
      id_reserva: reservaActiva[0]?.id_reserva,
    };
    console.log("datos enviados novedad", datos);

    navigate('/registroNovedad', { state: datos });
  };
  

  return (
    <section className={`py-5 ${styles.ParkingSection}`}>
      <Container>
        <h2 className="text-center mb-4">Espacios Parqueadero</h2>

        <div className="d-flex justify-content-center gap-4 mb-4">
          <Badge bg="success" className="px-3 py-2">
            <i className="bi bi-square-fill me-2"></i>Libre
          </Badge>
          <Badge bg="warning" className="px-3 py-2">
            <i className="bi bi-square-fill me-2"></i>Reservado
          </Badge>
          <Badge bg="danger" className="px-3 py-2">
            <i className="bi bi-square-fill me-2"></i>Ocupado
          </Badge>
          <Badge bg="secondary" className="px-3 py-2">
            <i className="bi bi-square-fill me-2"></i>No disponible
          </Badge>
        </div>

        <Row xs={2} md={4} lg={5} className="g-4 justify-content-center">
          {espacios.map((espacio) => {
            const estaDisponible = espacio.disponibilidad === "libre";
            return (
              <Col key={espacio.id_parqueadero}>
                <div
                  className={`${styles.parkingSpot} ${obtenerColor(
                    espacio.disponibilidad
                  )} ${!vehiculo?.placa && styles.disabledSpot}`}
                  onClick={async () => {
                    if (vehiculo?.placa && estaDisponible) {
                      // Caso 1: Espacio libre + usuario con vehículo → Reservar
                      setEspacioSeleccionado(espacio);
                      setShowReservaModal(true);
                    } 
                    else if (!estaDisponible) {
                      if (sesion.user.rol === 'vigilante') {
                        const reservas = await obtenerReservasPorEspacio(espacio.id_parqueadero);
                        console.log("prueba espacio", espacio.id_parqueadero);
                        console.log("log reservas", reservas);
                        if (reservas.length > 0) {
                          setReservaActiva(reservas);

                          if (espacio.disponibilidad === 'reservado') {
                            setShowAceptarModal(true);
                          } else if (espacio.disponibilidad === 'ocupado') {
                            setShowFinalizarModal(true);
                          }
                        } else {
                          alert("No se encontro informacion de reserva para este espacio");
                        }
                      } else {
                        alert("Solo el vigilante puede gestionar espacios ocupados");
                      }
                    } 
                    else if (!vehiculo?.placa) {
                      // Caso 3: Usuario sin vehículo → Mostrar advertencia
                      setShowModal(true);
                    }
                  }}
                >
                  <div className={styles.spotNumber}>
                    {espacio.numero_espacio}
                  </div>
                  {!estaDisponible && (
                    <div className={styles.occupiedBadge}>
                      <i className="bi bi-lock-fill"></i>
                    </div>
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal
        show={showReservaModal}
        onHide={() => setShowReservaModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="h4">Confirmar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="text-center mb-4">
            <div
              className={`${styles.modalParkingSpot} ${styles.disponible} mx-auto`}
            >
              {espacioSeleccionado?.numero_espacio}
            </div>
          </div>

          <div className="mb-4">
            <h5 className="mb-3">Detalles:</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <span>Vehiculo:</span>
                <strong>{vehiculo?.placa}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Hora estimada:</span>
                <strong>
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-100 py-2"
            onClick={() => {
              realizarReserva();
              setShowReservaModal(false);
            }}
          >
            <i className="bi bi-check-circle-fill me-2"></i>
            Confirmar Reserva
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showAceptarModal} onHide={() => setShowAceptarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aceptar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            {/* <div className={`${styles.modalParkingSpot} ${styles.reservado} mx-auto`}>
            {espacioSeleccionado?.numero_espacio}
            </div> */}
          </div>
          <div className="mb-4">
            <h5>Detalles Reserva</h5>
            <p><strong>Vehiculo:</strong>{reservaActiva[0]?.vehiculo_placa}</p>
            <p><strong>Hora de reserva:</strong>{new Date(reservaActiva[0]?.fecha_creacion).toLocaleString()}</p>
          </div>

          <Button
            variant="warning"
            className="w-100 mb-2"
            onClick={async () => {
              await aceptarReserva(reservaActiva[0]?.id_reserva);
              setShowAceptarModal(false);
              //actualizarEspacios();
            }}
          >
            <i className="bi bi-check-circle me-2"></i>
            Registrar Ingreso
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showFinalizarModal} onHide={() => setShowFinalizarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Finalizar Reserva - Espacio {espacioSeleccionado?.numero_espacio}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservaActiva.length > 0 && (
            <>
              <div className="mb-3">
                <p><strong>Vehiculo:</strong>{reservaActiva[0]?.vehiculo_placa}</p>
                <p><strong>Hora de entrada:</strong>{new Date(reservaActiva[0]?.fecha_hora_entrada).toLocaleString()}</p>
                <p><strong>Tiempo transcurrido:</strong>{calcularTiempo(reservaActiva[0]?.fecha_hora_entrada)}</p>
              </div>

              <Button
                variant="danger"
                className="w-100"
                onClick={async () => {
                  await finalizarReserva(reservaActiva[0].id_reserva);
                  setShowFinalizarModal(false);
                  //actualizarEspacios();
                }}
              >
                <i className="bi bi-flag-fill me-2"></i>
                Registrar salida
              </Button>

              <Button 
                className="w-100 mt-2"
                onClick={vistaNovedad}  
              >
                Registrar Novedad
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registro Requerido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <i
              className="bi bi-exclamation-triangle-fill text-warning"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <p className="text-center">
            Debes registrar un vehiculo antes de poder hacer una reserva de
            parqueadero.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={() => navigate("/Formulario")}>
            <i className="bi bi-car-front-fill me-2"></i>
            Registrar vehiculo
          </Button>
        </Modal.Footer>
      </Modal>

      <NotificationAlert
        show={showSuccessAlert}
        variant="success"
        message={alertMessage}
        onClose={() => setShowSuccessAlert(false)}
      />

      <NotificationAlert
        show={showErrorAlert}
        variant="danger"
        message={alertMessage}
        onClose={() => setShowErrorAlert(false)}
      />
    </section>
  );
}

export default EspaciosParqueadero;
