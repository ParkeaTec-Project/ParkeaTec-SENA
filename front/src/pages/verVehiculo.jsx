import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/vehiculo.module.css";
import { Modal, Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import ActualizarVehiculo from "./actualizarVehiculo";

function VerVehiculo({ actualizarVehiculo }) {
  const [showModal, setShowModal] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [sesion, setSesion] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    id_tipo_vehiculo: "",
  });

  const fecha = vehicleData.vencimiento_soat;

  // formato de fecha
  const vencimiento_soat = new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

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
        console.log("dato verificar sesion", data);
        setSesion(data);
      } catch (err) {
        console.error("Ocurrio un error al obtener la sesion", err);
      }
    };

    obtenerSesion();
  }, []);

  const obtenerVehiculo = useCallback(async () => {
    const id = sesion?.user?.id;
    if (!id) return;
    
    console.log("prueba sesion vehiculo", sesion.user.id);
    try {
      // ruta obtener vehiculo
      const response = await fetch(
        `http://localhost:4000/api/verVehiculo/${sesion.user.id}`,
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
      setVehicleData(data.vehiculo);
      // console.log(vehicleData);

      obtenerVehiculo();
    } catch (err) {
      console.error("Error:", err);
    }
  }, [sesion]);


  const handleDelete = async (id) => {
    console.log(`Borrar usuario con ID: ${id}`);

    try {
      const response = await fetch(`http://localhost:4000/api/borrarVehiculo/${vehicleData.placa}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        setModalMessage("Vehiculo borrado correctamente");
        setShowModalDelete(true);
      } else {
        setModalMessage("Error al borrar el vehiculo");
        setShowModalDelete(false);
      }
    } catch (err) {
      console.error("Error al borrar el vehiculo:", err);
    }
  };

  const handleCloseModal = () => setShowModalDelete(false);

  useEffect(() => {
    obtenerVehiculo();
  }, [obtenerVehiculo]);

  useEffect(() => {
    console.log("vehiculo seleccionado cambio:", vehiculoSeleccionado);
  }, [vehiculoSeleccionado]);

  const handleEdit = async (vehiculo) => {
    console.log("vehiculo editado:", vehiculo);
    setVehiculoSeleccionado(vehiculo);
    setShowModal(true);
  };

  const handleUpdate = async (vehiculoActualizado) => {
    try {
      await actualizarVehiculo(vehiculoActualizado);
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el vehiculo", error);
    }
  };

  return (
    <section className={`py-4 ${styles.section}`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className={`shadow-lg p-4  ${styles.card}`}>
              <Card.Body>
                <Row>
                  <Col md={7}>
                    <Card.Title className="mb-4">Tu vehiculo</Card.Title>
                    <div className="mb-3">
                      <p className="mb-2"><strong>Marca:</strong> { vehicleData.marca || 'N/A' } </p>
                      <p className="mb-2"><strong>Modelo:</strong> { vehicleData.modelo || 'N/A' } </p>
                      <p className="mb-2"><strong>Placa:</strong> { vehicleData.placa || 'N/A' } </p>
                      <p className="mb-2"><strong>Vencimiento SOAT:</strong> { vencimiento_soat || 'N/A' } </p>
                      <p className="mb-2"><strong>Observaciones:</strong> { vehicleData.observacion || 'N/A' } </p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(vehicleData)}
                      className="mt-2"
                    >
                      Actualizar vehiculo
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(vehicleData.placa)}
                      className="mt-2 ms-2"
                      >
                      Borrar vehiculo
                    </Button>
                  </Col>

                  <Col md={5} className="d-flex align-items-center">
                    <Image
                      fluid
                      rounded
                      src={`http://localhost:4000/uploads/vehicles/${vehicleData.foto_vehiculo}`}
                      alt="Foto del vehiculo"
                    />
                  </Col>
                  
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal actualizacion */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar vehiculo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vehicleData && (
            <div>
              <ActualizarVehiculo
                vehiculo={vehiculoSeleccionado}
                handleUpdate={handleUpdate}
                obtenerVehiculo={obtenerVehiculo}
              />
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal borrar */}
      <Modal show={showModalDelete} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vehiculo Eliminado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ modalMessage }</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    
  );
}

export default VerVehiculo;
