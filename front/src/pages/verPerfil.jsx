import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Badge, Card, Image, FloatingLabel } from "react-bootstrap";
//import styles from "../styles/header.module.css";
import styles from "../styles/verPerfil.module.css"

function VerPerfil() {
  const [sesion, setSesion] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [userData, setUserData] = useState({
    nombre: "",
    correo_electronico: "",
    nombre_documento: "",
    id_documento: "",
    rol: "",
    foto_usuario: "",
    qrCode: "",
  });

  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        //ruta para obtener la sesion
        const response = await fetch(

          //
          "https://hnp5ds36-4000.use2.devtunnels.ms/api/verificarSesion",

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

          //
          `https://hnp5ds36-4000.use2.devtunnels.ms/api/user/${sesion.user.id}`,

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
        setQrCode(data.qrCode);
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
              //
                src={`https://hnp5ds36-4000.use2.devtunnels.ms/uploads/users/${userData.foto_usuario}`}

                alt={`imagen usuario de ${userData?.nombre || "usuario"}`}
                roundedCircle
                fluid
                className={`shadow-sm ${styles.profileImage}`}
                onError={(e) => {
                  //
                  e.target.src = "https://hnp5ds36-4000.use2.devtunnels.ms/uploads/default.avif";

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
                <Image 
                  src={qrCode}
                  alt="Codigo QR del usuario"
                  width={200}
                  height={200}
                  fluid
                  rounded
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
       
      </Container>
    </section>
  );
}

export default VerPerfil;
