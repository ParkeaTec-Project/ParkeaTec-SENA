import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import styles from '../styles/header.module.css'

function VerPerfil(){

  const [sesion, setSesion] = useState('');
  const [userData, setUserData] = useState({
    usuario: {
      nombre: "",
      correo_electronico: "",
      nombre_documento: "",
      id_documento: "",
      rol: "",
      foto_usuario: "",
    }
  });

  useEffect(() => {
    const obtenerSesion = async () => {
      try {
        //ruta para obtener la sesion
        const response = await fetch("http://localhost:4000/api/verificarSesion", {
          credentials: "include"
        });

        const data = await response.json();
        console.log(data);
        setSesion(data);
      } catch(err) {
        console.error("ocurrio un error al obtener la sesion:", err);
      }
    }

    obtenerSesion();
  }, []);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        //ruta obtener usuarios
        const response = await fetch(`http://localhost:4000/api/user/${sesion.user.user_id}`, {
          method: "GET",
          credentials: "include",
        });

        if(!response.ok) {
          throw new Error("Error al obtener el usuario");
        }

        const data = await response.json();
        console.log("datos usuario:", data);
        setUserData(data);
      } catch(err) {
        console.error("Error:", err)
      }
    };

    if(sesion) {
      obtenerUsuario();
    }

  }, [sesion])
  
    return(
        <Container className='mt-4 mb-5'>
            <Row>
              <Col>
              <h1>Perfil</h1>
              <img className={styles.img} src={`http://localhost:4000/${userData?.usuario?.foto_usuario}`} alt="imagen usuario"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'http://localhost:4000/uploads/default.avif';
              }}
              />

            {/* <img
  src={`http://localhost:4000/${userData?.usuario?.foto_usuario}`}
  alt="imagen usuario"
  onError={(e) => {
    e.target.onerror = null; // Evita un bucle infinito si la imagen por defecto también falla
    e.target.src = 'http://localhost:4000/uploads/default.jpg'; // Ruta de la imagen por defecto
  }}
/> */}

{/* const handleImageError = (e) => {
  e.target.onerror = null; // Evita bucles infinitos
  e.target.src = 'http://localhost:4000/uploads/default.jpg'; // Imagen por defecto
};

<img
  src={`http://localhost:4000/${userData?.usuario?.foto_usuario}`}
  alt="imagen usuario"
  onError={handleImageError}
/> */}

              </Col>
              <Col>
              <Form className='mt-3 mb-7'>
                        <Form.Label >Nombre Completo</Form.Label>
                        <Form.Control className="mt-2" type="text" disabled placeholder="" value={ userData?.usuario?.nombre || "" } ></Form.Control>
                        <Form.Label className="mt-2">Tipo Documento</Form.Label>
                        <Form.Control className="mt-2" type="text" disabled placeholder="" value={ userData?.usuario?.nombre_documento || "" }></Form.Control>

                        <Form.Label className="mt-2">Numero Documento</Form.Label>
                        <Form.Control className="mt-2" type="number" disabled placeholder="" value={ userData?.usuario?.id_documento || "" }></Form.Control>

                        <Form.Label className="mt-2">Correo electronico</Form.Label>
                        <Form.Control className="mt-2" type="email" disabled placeholder="" value={ userData?.usuario?.correo_electronico || "" }></Form.Control>

                        <Form.Label className="mt-2" >Rol</Form.Label>
                        <Form.Control className="mt-2 " type="Text" disabled placeholder="" value={ userData?.usuario?.rol || "" }></Form.Control>
            </Form>
              </Col>
            </Row>
        </Container>
    );
}

export default VerPerfil;