import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import { Row, Container, Button, Col, Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function VerReservas() {
  const [reserva, setReserva] = useState([]);
  const [sesion, setSesion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        const response = await fetch(
          //
          "https://hnp5ds36-4000.use2.devtunnels.ms/api/verificarSesion",
          {
            credentials: "include",
          }
        );

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
        const response = await fetch(

          //
          `https://hnp5ds36-4000.use2.devtunnels.ms/api/obtenerReservas/${sesion.user.id}`,


          {
            method: "GET",
            credentials: "include",
          }
        );

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
      const response = await fetch(
        
        //
        `https://hnp5ds36-4000.use2.devtunnels.ms/api/cancelarReserva/${id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setReserva((prev) =>
          prev.map((res) =>
            res.id_reserva === id ? { ...res, estado: "cancelada" } : res
          )
        );
        toast.success("Reserva cancelada correctamente");
      } else {
        toast.error("Ocurrio un error inesperado");
        console.error("Error al cancelar la reserva");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const ReservaCard = ({ reserva, onCancel, isActive = false }) => {
    const formatDate = (dateString) => {
      if (!dateString) return "No registrada";
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("es-Es", options);
    };

    const getStatusBadge = (estado) => {
      const status = estado.toLowerCase();
      const variants = {
        activa: "success",
        cancelada: "danger",
        completada: "primary",
        pendiente: "warning",
      };
      return (
        <Badge bg={variants[status] || "secondary"} className="text-capitalize">
          {status}
        </Badge>
      );
    };

    return (
      <div
        className={`reserva-item ${
          isActive ? "active" : ""
        } p-3 mb-3 border rounded`}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">
              Espacio: <strong>{reserva.numero_espacio}</strong>
            </h5>
            <div className="d-flex gap-2 mb-2">
              {getStatusBadge(reserva.estado)}
              {isActive && (
                <Badge bg="info">
                  <i className="bi bi-star-fill me-1"></i>
                  Activa
                </Badge>
              )}
            </div>
          </div>
          <div className="text-end">
            <small className="text-muted">ID: {reserva.id_reserva}</small>
          </div>
        </div>

        <Row className="mt-2">
          <Col md={6}>
            <p className="mb-1">
              <i className="bi bi-calendar-plus me-2"></i>
              <strong>Creada:</strong> {formatDate(reserva.fecha_creacion)}
            </p>
            <p className="mb-1">
              <i className="bi bi-car-front me-2"></i>
              <strong>Vehiculo:</strong> {reserva.vehiculo_placa}
            </p>
          </Col>
          <Col md={6}>
            <p className="mb-1">
              <i className="bi bi-box-arrow-in-down-right me-2"></i>
              <strong>Entrada:</strong> {formatDate(reserva.fecha_hora_entrada)}
            </p>
            <p className="mb-1">
              <i className="bi bi-box-arrow-up-right me-2"></i>
              <strong>Salida:</strong> {formatDate(reserva.fecha_hora_salida)}
            </p>
          </Col>
        </Row>

        {reserva.estado.toLowerCase() === "pendiente" && (
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onCancel(reserva.id_reserva)}
            >
              <i className="bi bi-x-circle me-1"></i>
              Cancelar Reserva
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-4">
            <i className="bi bi-calendar-check me-2"></i>
            Mis reservas
          </h2>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-lightning-charge-fill me-2"></i>
                Reserva Activa
              </h5>
            </Card.Header>
            <Card.Body>
              {reserva.filter((r) => r.estado.toLowerCase() === "pendiente" && "aceptada")
                .length > 0 ? (
                reserva
                  .filter((r) => r.estado.toLowerCase() === "pendiente" && "aceptada")
                  .map((reserva) => (
                    <ReservaCard
                      key={reserva.id_reserva}
                      reserva={reserva}
                      onCancel={cancelarReserva}
                      isActive
                    />
                  ))
              ) : (
                <div className="text-center py-4">
                  <i
                    className="bi bi-calendar-x text-muted"
                    style={{ fontSize: "2rem" }}
                  ></i>
                  <p className="mt-2">No tienen reservas activas actualmente</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/EspaciosParqueadero")}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Nueva Reserva
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Historial de reservas
              </h5>
            </Card.Header>
            <Card.Body>
              {reserva.filter((r) => r.estado.toLowerCase() !== "pendiente")
                .length > 0 ? (
                <div className="reservas-grid">
                  {reserva
                    .filter((r) => r.estado.toLowerCase() !== "pendiente")
                    .sort(
                      (a, b) =>
                        new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
                    )
                    .map((reserva) => (
                      <ReservaCard
                        key={reserva.id_reserva}
                        reserva={reserva}
                        onCancel={cancelarReserva}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-3 text-muted">
                  <i
                    className="bi bi-journal-text"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  <p className="mt-2">No hay reservas historicas registradas</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VerReservas;
