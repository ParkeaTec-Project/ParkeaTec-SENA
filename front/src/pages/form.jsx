import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import styles from '../styles/header.module.css';


function Formulario (){
    const [sesion, setSesion] = useState('');
    const [userData, setUserData] =useState({
        usuario: {
            nombre: "",
            apellido: "",
            correo: "",
            ficha: "",
            centroFormacion: "",
            tipoDocumento: "",
            numDocumento: "",
            telefono: "",
            direccion: "",
        }
    });

    useEffect (() =>{
        const obtenerSesion = async () =>{
            try{
                const response = await fetch('http://localhost:4000/api/verificarSesion',{
                    credentials : 'include'
                });

                const data = await response.json();
                console.log(data);
                setSesion(data); 
            }
            catch(err){
                console.error('Ocurrio un error al obtener la sesion', err);
            }
        }

        obtenerSesion();

    }, []);

    useEffect(() =>{
        const obtenerUsuario = async () =>{
            try{
                const response = await fetch(`http://localhost:4000/api/user/${sesion.user.user_id}`,{
                    method: 'GET',
                    credentials: 'include',
                });

                if(!response.ok){
                    throw new Error("Error al obtener usuario");
                }

                const data = await response.json();
                console.log("datos usuario", data);
                setUserData(data);
                console.log(data.usuario.nombre);
            }
            catch(err){
                console.error("Error:", err);
            }
        };

        if(sesion){
            obtenerUsuario();
        }
    }, [sesion])

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
                value={
                  userData.usuario.nombre + " " + userData.usuario.apellido
                }
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Tipo Documento</Form.Label>
              <Form.Control
                className="mt-2"
                type="text"
                disabled
                value={userData.usuario.nombre_documento}
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
                value={userData.usuario.id_documento}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label className="mt-2">Centro de formacion</Form.Label>
              <Form.Control
                className="mt-2"
                type="text"
                disabled
                value={userData.usuario.centro_formacion}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="mt-2">Tipo de persona </Form.Label>
              <Form.Select className= 'mt-2'>
                <option>Seleccione una opcion</option>
                <option value="1">Funcionario</option>
                <option value="2">Contratista</option>
                <option value="3">Aprendiz</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label className="mt-2">Ficha Aprendiz</Form.Label>
              <Form.Control className="mt-2" type="text" disabled value={userData.usuario.ficha_aprendiz}
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
                <Form.Control className="mt-2" type="text" disabled value={userData.usuario.direccion}></Form.Control>
            </Col>
            <Col>
                <Form.Label className="mt-2">Telefono</Form.Label>
                <Form.Control className="mt-2" type="number" disabled value={userData.usuario.telefono} ></Form.Control>
            </Col>
            </Row>
            <Row>
            <Col>
                <Form.Label className="mt-2">Correo electronico </Form.Label>
                <Form.Control className="mt-2" type="email" disabled value={userData.usuario.correo_electronico}></Form.Control>
            </Col>
            <Col>
                <Form.Label className="mt-2">Tipo de vehiculo</Form.Label>
                <Form.Select className="mt-2">
                    <option value="">Seleccione una opcion</option>
                    <option value="vehiculo">Vehiculo</option>
                    <option value="motocicleta">Motocicleta</option>
                    <option value="bicicleta">Bicicleta</option>
                </Form.Select>

            </Col>
            </Row>
        </Form>
      </Container>
    );

}

export default Formulario;