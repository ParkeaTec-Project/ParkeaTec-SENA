import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Badge, Card, Image, FloatingLabel } from "react-bootstrap";
//import styles from "../styles/header.module.css";
import styles from "../styles/verPerfil.module.css"

function VerPerfil() {
  const [sesion, setSesion] = useState(null);
  const [userData, setUserData] = useState({
    nombre: "",
    correo_electronico: "",
    nombre_documento: "",
    id_documento: "",
    rol: "",
    foto_usuario: "",
  });

  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        //ruta para obtener la sesion
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
        console.error("ocurrio un error al obtener la sesion:", err);
      }
    };

    obtenerSesion();
  }, []);

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!sesion?.user?.id) return;

      try {
        //ruta obtener usuarios
        const response = await fetch(
          `http://localhost:4000/api/user/${sesion.user.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener el usuario");
        }

        const data = await response.json();
        console.log("datos usuario:", data);
        console.log("prueba usuario:", data.usuario[0]);
        setUserData(data.usuario[0]);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    if (sesion) {
      obtenerUsuario();
    }
  }, [sesion]);

  return (
    <section className={ `py-5 ${styles.section}` }>
      <Container>
        <Row className="g-4">
          {/* columna de la imagen */}
          <Col md={5} className="d-flex flex-column align-items-center">
            <div className={`position-relative ${styles.avatar}`}>
              <Image
                src={`http://localhost:4000/uploads/users/${userData.foto_usuario}`}
                alt={`imagen usuario de ${userData?.nombre || "usuario"}`}
                roundedCircle
                fluid
                className={`shadow-sm ${styles.profileImage}`}
                onError={(e) => {
                  e.target.src = "http://localhost:4000/uploads/default.avif";
                  console.error('Error cargando la imagen:', e.target.src);
                }}
              />
              <Badge
                bg="primary"
                className={`position-absolute ${styles.roleBadge}`}
              >
                {userData?.rol || 'Usuario'}
              </Badge>
            </div>
            <h2 className="mt-4 text-center">{userData?.nombre || 'Nombre no disponible'}</h2>
          </Col>

          {/* columna formulario */}
          <Col md={7}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h3 className="mb-4">Informacion del perfil</h3>
                <Form>
                  <Row className="g-3">
                    {[
                      { label: "Nombre completo", value: userData?.nombre, type: "text" },
                      { label: "Tipo de documento", value: userData?.nombre_documento, type: "text" },
                      { label: "Numero documento", value: userData?.id_documento, type: "number" },
                      { label: "Correo Electronico", value: userData?.correo_electronico, type: "email" }
                    ].map((field, index) => (
                      <Col md={6} key={index}>
                        <FloatingLabel controlId={field.label} label={field.label}>
                          <Form.Control
                            type={field.type}
                            value={field.value || ""}
                            disabled
                            className="bg-light"
                          />
                        </FloatingLabel>
                      </Col>
                    ))}
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  //   <section className={styles.section}>
  //   <Container className={`mt-4 mb-5 `}>
  //   <Row>
  //     <Col>
  //       <h1>Perfil</h1>
  //       <img
  //         // className={styles.img}
  //         src={`http://localhost:4000/uploads/users/${userData.foto_usuario}`}
  //         alt={`imagen usuario de ${userData?.nombre || "usuario"}`}
  //         onError={(e) => {
  //           e.target.src = "http://localhost:4000/uploads/default.avif";
  //           console.error('Error cargando la imagen:', e.target.src);
  //         }}
  //         crossOrigin="anonymous"
  //       />
  //     </Col>
  //     <Col>
  //       <Form className="mt-3 mb-7">
  //         <Form.Label>Nombre Completo</Form.Label>
  //         <Form.Control
  //           className="mt-2"
  //           type="text"
  //           disabled
  //           placeholder=""
  //           value={userData?.nombre || ""}
  //         ></Form.Control>
  //         <Form.Label className="mt-2">Tipo Documento</Form.Label>
  //         <Form.Control
  //           className="mt-2"
  //           type="text"
  //           disabled
  //           placeholder=""
  //           value={userData?.nombre_documento || ""}
  //         ></Form.Control>

  //         <Form.Label className="mt-2">Numero Documento</Form.Label>
  //         <Form.Control
  //           className="mt-2"
  //           type="number"
  //           disabled
  //           placeholder=""
  //           value={userData?.id_documento || ""}
  //         ></Form.Control>

  //         <Form.Label className="mt-2">Correo electronico</Form.Label>
  //         <Form.Control
  //           className="mt-2"
  //           type="email"
  //           disabled
  //           placeholder=""
  //           value={userData?.correo_electronico || ""}
  //         ></Form.Control>

  //         <Form.Label className="mt-2">Rol</Form.Label>
  //         <Form.Control
  //           className="mt-2 "
  //           type="Text"
  //           disabled
  //           placeholder=""
  //           value={userData?.rol || ""}
  //         ></Form.Control>
  //       </Form>
  //     </Col>
  //   </Row>
  // </Container>
  //   </section>
    
  );
}

export default VerPerfil;
