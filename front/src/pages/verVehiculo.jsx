import React, { useState, useEffect } from "react";
import styles from "../styles/vehiculo.module.css";
import { Modal } from "react-bootstrap";
import ActualizarVehiculo from "./actualizarVehiculo";

function VerVehiculo({ actualizarVehiculo }) {
  const [showModal, setShowModal] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [sesion, setSesion] = useState(null);
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

  const obtenerVehiculo = async () => {
    if (!sesion?.user?.id) return;
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
      console.log(vehicleData);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    obtenerVehiculo();
  }, [sesion]);

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

  // const handleCloseModal = () => setShowModal(false);

  return (
    <section className={styles.section}>
      <div className={styles.containerVehiculo}>
        <h2>Tu vehiculo</h2>
        <div>
          <h3>Marca: {vehicleData.marca}</h3>
          <h3>Modelo: {vehicleData.modelo}</h3>
          <h3>Placa: {vehicleData.placa}</h3>
        </div>
        <img
          className={styles.imgVehiculo}
          src={`http://localhost:4000/uploads/vehicles/${vehicleData.foto_vehiculo}`}
          alt="foto vehiculo"
        />
        <button onClick={() => handleEdit(vehicleData)}>Actualizar</button>
      </div>
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
    </section>
  );
}

export default VerVehiculo;
