import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Alert, Badge, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import styles from "../styles/strikesUsuario.module.css";

function VerStrikesUsuario() {
  const [strikesUsuario, setStrikesUsuario] = useState([]);
  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        const response = await fetch(
          "https://hnp5ds36-4000.use2.devtunnels.ms/verificarSesion",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("dato verificar sesion", data);
        setSesion(data);
      } catch (err) {
        console.error("ocurrio un error al obtener la sesion:", err);
      }
    };

    obtenerSesion();
  }, []);

  useEffect(() => {
    const obtenerStrikes = async () => {
      try {
        const response = await fetch(
          `https://hnp5ds36-4000.use2.devtunnels.ms/api/strikesUsuario/${sesion.user.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los strikes");
        }

        const data = await response.json();
        console.log("strikes usuario", data);
        setStrikesUsuario(data.data);
      } catch (err) {
        console.error("Error", err);
      }
    };

    if (sesion) {
      obtenerStrikes();
    }
  }, [sesion]);

  return (
    <section className={`py-5 ${styles.strikesSection}`}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
            Mis Strikes
          </h2>
          <p className="text-muted">Registro en el parqueadero</p>
        </div>

        {strikesUsuario.length === 0 ? (
          <Card className="border-0 shadow-sm text-center py-4">
            <Card.Body>
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "3rem" }}
              ></i>
              <h4 className="mt-3 text-success">¡Buen trabajo!</h4>
              <p className="text-muted">No tienes strikes registrados</p>
            </Card.Body>
          </Card>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {strikesUsuario.map((strike, index) => (
              <Col key={strike.id_strike}>
                <Card
                  className={`h-100 border-0 shadow-sm ${styles.strikeCard}`}
                >
                  <Card.Header className={`py-3 ${styles.strikeHeader}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-danger rounded-pill">
                        Strike #{index + 1}
                      </span>
                      <small className="text-muted">
                        {new Date(strike.fecha_strike).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </small>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <h6 className="fw-bold mb-1">
                        <i className="bi bi-card-text text-primary me-2"></i>
                        Descripcion:
                      </h6>
                      <p className="mb-0">{strike.descripcion}</p>
                    </div>

                    <div className="d-flex flex-wrap gap-3">
                      <div>
                        <h6 className="fw-bold mb-1">
                          <i className="bi bi-car-front text-secondary me-2"></i>
                          Vehículo:
                        </h6>
                        <p className="mb-0">{strike.id_vehiculo}</p>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          <i className="bi bi-journal-text text-info me-2"></i>
                          Reserva:
                        </h6>
                        <p className="mb-0">{strike.id_reserva}</p>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          <i className="bi bi-shield-exclamation text-warning me-2"></i>
                          Reportado por:
                        </h6>
                        <p className="mb-0">Vigilante #{strike.id_vigilante}</p>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="border-0 bg-transparent pt-0">
  <div className="d-flex justify-content-end gap-2">
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Registro permanente</Tooltip>}
    >
      <i className="bi bi-lock text-muted"></i>
    </OverlayTrigger>
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>No aplica recurso</Tooltip>}
    >
      <i className="bi bi-ban text-muted"></i>
    </OverlayTrigger>
  </div>
</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
    // <section className={`${styles.section}`}>
    //     <Container className="mt-4">
    //     <h2 className="mb-4">Mis Strikes</h2>

    //     {strikesUsuario.length === 0 ? (
    //         <Alert variant="info">No tienes strikes registrados</Alert>
    //     ) : (
    //         <Row xs={1} md={2} lg={3} className="g-4">
    //             {strikesUsuario.map((strike, index) => (
    //                 <Col key={strike.id_strike}>
    //                     <Card className="h-100 shadow-sm">
    //                         <Card.Body>
    //                             <Card.Title>Strike #{index + 1}</Card.Title>
    //                             <Card.Title><strong>Descripcion:</strong>{strike.descripcion}</Card.Title>
    //                             <Card.Title><strong>Fecha:</strong>{new Date(strike.fecha_strike).toLocaleString()}</Card.Title>
    //                             <Card.Title><strong>Vehiculo:</strong>{strike.id_vehiculo}</Card.Title>
    //                             <Card.Title><strong>Reserva ID:</strong>{strike.id_reserva}</Card.Title>
    //                             <Card.Title><strong>Vigilante ID:</strong>{strike.id_vigilante}</Card.Title>
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //             ))}
    //         </Row>
    //     )}
    // </Container>
    // </section>
  );
}

export default VerStrikesUsuario;
