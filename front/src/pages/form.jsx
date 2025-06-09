import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
// import styles from "../styles/header.module.css";

function Formulario() {
  const [sesion, setSesion] = useState("");
  const [vehiculo, setVehiculo] = useState(null);
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    ficha_aprendiz: "",
    centro_formacion: "",
    nombre_documento: "",
    id_documento: "",
    telefono: "",
    direccion: "",
    placa: "",
    tipo_vehiculo: "",
    modelo: "",
    marca: "",
    color: "",
    vencimiento_soat: "" || null,
    observacion: "",
    id_tipo_vehiculo: "",
    firma_usuario: "",
    foto_documento: "",
    foto_carnet: "",
    foto_placa_vehiculo: "" || null,
    foto_serial: "" || null,
    foto_vehiculo: "",
    foto_licencia_conducir: "" || null,
    foto_tarjeta_propiedad: "" || null,
    foto_soat: "" || null,
    foto_tecnomecanica: "" || null,
  });
  const [selectedOption, setSelectedOption] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const newValue = files && files.length > 0 ? files[0] : value;

    console.log("📸 Cambiado:", name, "| Valor:", newValue);

    setUserData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("prueba form vehiculo", userData);
    console.log("🔎 Estado userData antes de FormData:", userData);

    const data = new FormData();
    console.log("🔎 Estado userData antes de FormData:", userData);

    Object.keys(userData).forEach((field) => {
      data.append(field, userData[field]);
    });
    console.log("✅ FormData contenido:");
    for (let pair of data.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    try {
      console.log(data);
      console.log("✅ FormData antes del fetch:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }
      const response = await fetch(
        "http://localhost:4000/api/registroVehiculo",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log("resultado", result);

      if (response.ok) {
        setShowModal(true);
      } else {
        setShowModal(false);
        alert("no se pudo hacer el registro");
      }

      // if (response.ok) {
      //   alert("registro de vehiculo exitoso");
      //   console.log("vehiculo registrado", result);
      // } else {
      //   alert("no se pudo hacer el registro");
      // }
    } catch (error) {
      console.log("Error al conectar con el servidor", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  console.log("Selecte option", selectedOption);
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
        console.log(data);
        setSesion(data);
      } catch (err) {
        console.error("Ocurrio un error al obtener la sesion", err);
      }
    };

    obtenerSesion();
  }, []);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/user/${sesion.user.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener usuario");
        }

        const data = await response.json();
        console.log("datos usuario", data);
        setUserData(data.usuario[0]);
        console.log(data.usuario.nombre);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    if (sesion) {
      obtenerUsuario();
    }
  }, [sesion]);

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
          
        console.log("prueba");
        const data = await response.json();
        console.log("verificar vehiculo", data);
        setVehiculo(data.vehiculo);
      } catch (err) {
        console.error("Error al obtener el vehiculo:", err);
        setVehiculo(false);
      }
    };
    if (sesion?.user?.id) {
      obtenerVehiculo();
    }
    
  }, [sesion?.user?.id]);
  console.log("vehiculo", vehiculo);

  return (
    <Container className="mt-4 mb-5">
      <h2>Formulario solicitud parqueadero</h2>
      {vehiculo ? (
        <div className="alert alert-warning mt-4">
          <p>Ya tienes un vehiculo registrado. No puedes registrar otro</p>
          <Button as={Link} to="/MiVehiculo">Ver mi vehiculo</Button>
        </div>
        
      ) : (
        <>
          <Form className="mb-5" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.nombre + " " + userData.apellido}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Tipo Documento</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.nombre_documento}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="mt-2">Numero de documento </Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.id_documento}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label className="mt-2">Centro de formacion</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.centro_formacion}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="mt-2">Ficha Aprendiz</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.ficha_aprendiz}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="mt-2">Direccion </Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.direccion}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label className="mt-2">Telefono</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="number"
                  disabled
                  value={userData.telefono}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="mt-2">Correo electronico </Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  disabled
                  value={userData.correo_electronico}
                ></Form.Control>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="mt-2">Foto Firma Usuario</Form.Label>
                  <Form.Control
                    className="mt-2"
                    type="file"
                    required
                    name="firma_usuario"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="mt-2">Foto Documento</Form.Label>
                  <Form.Control
                    className="mt-2"
                    type="file"
                    required
                    name="foto_documento"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="mt-2">Foto Carnet</Form.Label>
                  <Form.Control
                    className="mt-2"
                    type="file"
                    required
                    name="foto_carnet"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="mt-2">Tipo de vehiculo</Form.Label>
                <Form.Select
                  className="mt-2"
                  value={selectedOption}
                  name="id_tipo_vehiculo"
                  // onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedOption(e.target.value);
                    setUserData((prev) => ({
                      ...prev,
                      id_tipo_vehiculo: e.target.value,
                    }));
                  }}
                >
                  <option value="">Seleccione una opcion</option>
                  <option value="1">Motocicleta</option>
                  <option value="2">Bicicleta</option>
                </Form.Select>
              </Col>
            </Row>

            {selectedOption === "1" && (
              <>
                <Row>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label>Placa del vehiculo</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="text"
                        name="placa"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label>Modelo</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="text"
                        name="modelo"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">Marca</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="text"
                        required
                        name="marca"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label className="mt-2">Color</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="tel"
                        required
                        name="color"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">vencimiento_soat</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="date"
                        required
                        name="vencimiento_soat"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">observacion</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="text"
                        required
                        name="observacion"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">Foto placa</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_placa_vehiculo"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">foto_vehiculo</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_vehiculo"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">
                        Foto Licencia Conducir
                      </Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_licencia_conducir"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">
                        Foto Tarjeta Propiedad
                      </Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_tarjeta_propiedad"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">Foto Soat</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_soat"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="mt-2">
                        Foto TecnoMecanica
                      </Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_tecnomecanica"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            {selectedOption === "2" && (
              <>
                <Row>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label className="mt-2">Nro serial</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="tel"
                        required
                        name="placa"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label className="mt-2">serial</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_serial"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label className="mt-2">Foto Vehiculo</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="file"
                        required
                        name="foto_vehiculo"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label className="mt-2">Observacion</Form.Label>
                      <Form.Control
                        className="mt-2"
                        type="text"
                        required
                        name="observacion"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <Button className="mt-3" variant="success" type="submit">
              Enviar
            </Button>
          </Form>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Vehiculo registrado</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Formulario;
