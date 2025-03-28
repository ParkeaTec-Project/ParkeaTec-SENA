import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/header.module.css";

function Formulario() {
  const [sesion, setSesion] = useState("");
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
  });
  const [selectedOption, setSelectedOption] = useState("");

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

  return (
    <Container className="mt-4 mb-5">
      <h2>Formulario solicitud parqueadero</h2>
      <Form className="mb-5">
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
            <Form.Label className="mt-2">Tipo de persona </Form.Label>
            <Form.Select className="mt-2">
              <option>Seleccione una opcion</option>
              <option value="1">Funcionario</option>
              <option value="2">Contratista</option>
              <option value="3">Aprendiz</option>
            </Form.Select>
          </Col>
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
            <Form.Label className="mt-2">Fecha inicio vinculacion </Form.Label>
            <Form.Control className="mt-2" type="date"></Form.Control>
          </Col>
          <Col>
            <Form.Label className="mt-2">Fecha fin vinculacion</Form.Label>
            <Form.Control className="mt-2" type="date"></Form.Control>
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
          <Col>
            <Form.Label className="mt-2">Tipo de vehiculo</Form.Label>
            <Form.Select
              className="mt-2"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Seleccione una opcion</option>
              <option value="vehiculo">Vehiculo</option>
              <option value="motocicleta">Motocicleta</option>
              <option value="bicicleta">Bicicleta</option>
            </Form.Select>
          </Col>

          {selectedOption === "vehiculo" && (
            <Row>
              <Col>
                <Form.Group className="mt-2">
                  <Form.Label>Placa del vehiculo</Form.Label>
                  <Form.Control className="mt-2" type="text" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-2">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control className="mt-2" type="text" />
                </Form.Group>
              </Col>
              <Col>
              <Col>
              <Form.Group>
                <Form.Label className="mt-2">Marca</Form.Label>
                <Form.Control className="mt-2" type="text" required></Form.Control>
              </Form.Group>
          </Col>
              </Col>
            </Row>
          )}

          {selectedOption === "motocicleta" && (
            <Row>
              <Col>
                <Form.Group className="mt-2">
                  <Form.Label className="mt-2">Cilindraje</Form.Label>
                  <Form.Control className="mt-2" type="tel" required></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="mt-2">Modelo</Form.Label>
                  <Form.Control className="mt-2" type="tel" required></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )}

          {selectedOption === "bicicleta" && (
            <Form.Group className="mt-2">
              <Form.Label className="mt-2">serial</Form.Label>
              <Form.Control className="mt-2" type="tel" required></Form.Control>
            </Form.Group>
          )}
        </Row>
        <Button variant="submit" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Formulario;
