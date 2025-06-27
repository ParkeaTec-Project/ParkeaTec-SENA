import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container,Row,Col,Form,Button,Modal,Alert} from "react-bootstrap";
import styles from "../styles/registroUsuario.module.css";

function Registro() {
  const [formData, setFormData] = useState({
    id_documento: "", //
    nombre: "", //
    apellido: "", //
    telefono: "", //
    direccion: "",
    correo: "", //
    password: "", //
    foto_usuario: null, //
    centro_formacion: "", //
    ficha_aprendiz: "", //
    firma_usuario: null, 
    foto_documento: null,
    foto_carnet: null,
    id_tipo_documento: "", //
    rol_id: "3",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: "",
    id_documento: "",
    id_tipo_documento: "",
    centro_formacion: "",
    ficha_aprendiz: "",
  });

  const regex = {
    nombre: /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/,
    apellido: /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/,
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(.*[^A-Za-z\d]){1,}).{8,}$/,
    telefono: /^3[0-5][0-9]{8}$/,
    direccion:
      /^(cl|cll|calle|cra|crr|carrera|av|avenida|dg|diagonal|tv|transversal)\s+\d{1,3}(?:\s+\w+)?\s*#\s*\d{1,3}(?:[a-zA-Z])?\s*-\s*\d{1,3}(?:\s+\w+)?$/i,
    id_documento: /^\d{6,10}$/,
    ficha_aprendiz: /^\d{7}$/,
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) validateField(name, value);

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
        if (!value) error = "Se requiere el nombre";
        else if (!regex.nombre.test(value)) error = "Ingrese solo letras";
        break;

      case "apellido":
        if (!value) error = "Se require el apellido";
        else if (!regex.apellido.test(value)) error = "Ingrese solo letras";
        break;

      case "correo":
        if (!value) error = "Se require el correo electronico";
        else if (!regex.correo.test(value))
          error = "Ingrese un correo electronico valido";
        break;

      case "password":
        if (!value) error = "Se requiere una contraseña";
        else if (!regex.password.test(value))
          error =
            "La contraseña no cumple con los requisitos: Se requiere que tenga 1 mayuscula, 1 minuscula, 1 numero y un caracter especial";
        break;

      case "telefono":
        if (!value) error = "Se requere su numero";
        else if (!regex.telefono.test(value))
          error = "Numero de telefono invalido";
        break;

      case "direccion":
        if (!value) error = "Se requiere su direccion";
        else if (!regex.direccion.test(value))
          error = "Formato de direccion incorrecto";
        break;

      case "id_documento":
        if (!value) error = "Se requiere su numero de documento";
        else if (!regex.id_documento.test(value)) error = "Documento invalido";
        break;

      case "id_tipo_documento":
        if (!value) error = "Seleccione su tipo de documento";
        break;

        case "centro_formacion":
        if (!value) error = "Seleccione un centro de formacion";
        break;

        case "ficha_aprendiz":
            if(!value) error = "Ingrese su numero de ficha";
            else if(!regex.ficha_aprendiz.test(value)) error = 'Numero de ficha invalido';
            break;
        default:
          break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("prueba front", formData);
    let formIsValid = true;
    const newErrors = {};

    const data = new FormData();
    console.log(data);

    Object.keys(formData).forEach((field) => {
      data.append(field, formData[field]);
      const isValid = validateField(field, formData[field]);
      if (!isValid) formIsValid = false;
      newErrors[field] = errors[field];
    });

    if (!formIsValid) {
      console.log("Formulario incorrecto");
    }

    console.log("Formulario enviado: ", formData);

    try {
      const response = await fetch("https://hnp5ds36-4000.use2.devtunnels.ms/api/registro", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setModalMessage("Registro exitoso");
        setShowModal(true);
        console.log("Usuario Creado", result);
      } else {
        setModalMessage("Error", result.message);
        setShowModal(false);
      }
    } catch (error) {
      console.log("Error al conectar con el servidor", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className={`mt-4 mb-4 py-5 ${styles.container}`}>
      <h1>Registro Aprendiz</h1>
      <Form className="mt-5 mb-4" onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Nombre</Form.Label>
            <Form.Control
              className={`mt-1  ${styles.input} `}
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={(e) => validateField("nombre", e.target.value)}
              isInvalid={!!errors.nombre}
              placeholder="Ingrese su nombre"
            />
            <Form.Text className="text-muted" />
            {errors.nombre && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.nombre}
              </Alert>
            )}
          </Col>

          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Apellidos</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              onBlur={(e) => validateField("apellido", e.target.value)}
              isInvalid={!!errors.apellido}
              placeholder="Ingrese su apellido"
            />
            <Form.Text className="text-muted" />
            {errors.apellido && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.apellido}
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Correo electronico</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              onBlur={(e) => validateField("correo", e.target.value)}
              isInvalid={!!errors.correo}
              placeholder="example@domain.com"
            />
            <Form.Text className="text-muted" />
            {errors.correo && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.correo}
              </Alert>
            )}
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Contraseña</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField("password", e.target.value)}
              isInvalid={!!errors.password}
              placeholder="Contraseña1234*"
            />
            <Form.Text className="text-muted" />
            {errors.password && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.password}
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Telefono</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              onBlur={(e) => validateField("telefono", e.target.value)}
              isInvalid={!!errors.telefono}
              placeholder="Ej: 3101234560"
            />
            <Form.Text className="text-muted" />
            {errors.telefono && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.telefono}
              </Alert>
            )}
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Direccion</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              onBlur={(e) => validateField("direccion", e.target.value)}
              isInvalid={!!errors.direccion}
              placeholder="Calle 123 #45-6"
            />
            <Form.Text className="text-muted" />
            {errors.direccion && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.direccion}
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Tipo Documento</Form.Label>
            <Form.Select
              className={`mt-1 ${styles.input} `}
              name="id_tipo_documento"
              value={formData.id_tipo_documento}
              onChange={handleChange}
              onBlur={(e) => validateField("id_tipo_documento", e.target.value)}
              isInvalid={!!errors.id_tipo_documento}
              required
            >
              <option>Seleccione una opcion</option>
              <option value="1">Cedula de ciudadania</option>
              <option value="2">Cedula de extranjería</option>
              <option value="3">Tarjeta de identidad</option>
            </Form.Select>
            <Form.Text className="text-muted" />
            {errors.id_tipo_documento && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.id_tipo_documento}
              </Alert>
            )}
          </Col>

          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Numero de documento</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="number"
              name="id_documento"
              value={formData.id_documento}
              onChange={handleChange}
              onBlur={(e) => validateField("id_documento", e.target.value)}
              isInvalid={!!errors.id_documento}
              placeholder="1234568"
            />
            <Form.Text className="text-muted" />
            {errors.id_documento && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.id_documento}
              </Alert>
            )}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Foto Usuario</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="file"
              name="foto_usuario"
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Centro Formacion</Form.Label>
            <Form.Select
              className={`mt-1 ${styles.input} `}
              name="centro_formacion"
              value={formData.centro_formacion}
              onChange={handleChange}
              onBlur={(e) => validateField("centro_formacion", e.target.value)}
              isInvalid={!!errors.centro_formacion}
              >
              <option>Seleccione su centro de formación</option>
              <option value="CEET">CEET</option>
            </Form.Select>
            <Form.Text className="text-muted" />
            {errors.centro_formacion && (
              <Alert variant="danger" className="mt-2 p-2 small">
                {errors.centro_formacion}
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Ficha Aprendiz</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="text"
              name="ficha_aprendiz"
              value={formData.ficha_aprendiz}
              onChange={handleChange}
              onBlur={(e) => validateField("ficha_aprendiz", e.target.value)}
              isInvalid={!!errors.ficha_aprendiz}
              placeholder="1234567"
            />
            <Form.Text className="text-muted"/>
            {errors.ficha_aprendiz &&(
                <Alert variant="danger" className="mt-2 p-2 small">
                    {errors.ficha_aprendiz}
                </Alert>
            )}
          </Col>
          {/*<Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Firma Usuario</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="file"
              name="firma_usuario"
              onChange={handleChange}
            ></Form.Control>
          </Col>*/}
        </Row>
        {/*<Row className="justify-content-center">
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Foto Documento</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="file"
              name="foto_documento"
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Label className="mt-1">Foto Carnet</Form.Label>
            <Form.Control
              className={`mt-1 ${styles.input} `}
              type="file"
              name="foto_carnet"
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Row>*/}
        <Button
          className={`mt-3 ${styles.button}`}
          variant="success"
          type="submit"
        >
          Registrarse
        </Button>
      </Form>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Registro;
