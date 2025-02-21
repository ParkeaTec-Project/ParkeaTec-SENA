import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Link } from "react-router-dom";


function CrearUsuario() {
    const [formData, setFormData] = useState({
        id_documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        correo: "",
        password: "",
        foto_usuario: "",
        centro_formacion: "",
        ficha_aprendiz: null,
        firma_usuario: null,
        foto_documento: null,
        foto_carnet: null,
        id_tipo_documento: "",
        rol_id: ""
    });

    //Modal 
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if(files) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({ 
                ...formData,
                [name]: value
            });
        }
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const data = new FormData();
        console.log(data);

        Object.keys(formData).forEach(key => {
            data.append(key, formData[key])
        });


        try {
            const response = await fetch("http://localhost:4000/api/user", {
                method: "POST",
                body: data,
                credentials: "include"
            });

            const result = await response.json();

            if(response.ok) {
                setModalMessage("Usuario Creado");
                setShowModal(true);
                console.log("Usuario Creado");
            } else {
                setModalMessage("Error", result.message);
                setShowModal(false);
            }
        } catch (error) {
            console.log("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor")
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="mt-5 mb-5">
            <h2 className="mb-4">Crear Usuario</h2>
            <Form onSubmit={ handleSubmit } encType="multipart/form-data" className="mb-5">
                <Form.Group className="mb-3" controlId="nroDocumento">
                    <Form.Label>Nro Documento</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ingrese su documento"
                        name="id_documento"
                        value={ formData.id_documento }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="nombre"
                                name="nombre"
                                value={ formData.nombre } 
                                onChange={ handleChange }
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group controlId="apellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Apellido"
                                name="apellido"
                                value={ formData.apellido } 
                                onChange={ handleChange }
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group className="mb-3" controlId="telefono">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono"
                            name="telefono"
                            value={ formData.telefono } 
                            onChange={ handleChange }
                        />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group className="mb-3" controlId="telefono">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Direccion"
                            name="direccion"
                            value={ formData.direccion } 
                            onChange={ handleChange }
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group className="mb-3" controlId="correo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="correo"
                            name="correo"
                            value={ formData.correo } 
                            onChange={ handleChange }
                        />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group className="mb-3" controlId="contraseña">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="password"
                            name="password"
                            value={ formData.password } 
                            onChange={ handleChange }
                        />
                        </Form.Group>
                    </Col>
                    
                </Row>

                <Form.Group className="mb-3" controlId="fotoUsuario">
                <Form.Label>Foto Usuario</Form.Label>
                    <Form.Control 
                        type="file"
                        placeholder="foto"
                        name="foto_usuario"
                        onChange={ handleChange }
                    />
                </Form.Group>
                    
                <Form.Group className="mb-3" controlId="centroFormacion">
                    <Form.Label>Centro de Formacion</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Centro formacion"
                        name="centro_formacion"
                        value={ formData.centro_formacion } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="firma">
                    <Form.Label>Firma Usuario</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Firma"
                        name="firma_usuario"
                        value={ formData.firma_usuario } 
                        onChange={ handleChange }
                    />
                </Form.Group> */}


                <Form.Group className="mb-3" controlId="tipoDocumento">
                    <Form.Label>Tipo de documento</Form.Label>
                    <Form.Select 
                        name="id_tipo_documento"
                        value={ formData.id_tipo_documento } 
                        onChange={ handleChange }
                    >
                        <option value="">Selecciona tu documento</option>
                        <option value="1">Cedula de ciudadania</option>
                        <option value="2">Cedula de extranjeria</option>
                        <option value="3">Tarjeta de identidad</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="rol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                        name="rol_id"
                        value={ formData.rol_id } 
                        onChange={ handleChange }
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Vigilante</option>
                        <option value="3">Usuario</option>
                    </Form.Select>
                </Form.Group>

                <Button className="mb-5" variant="success" type="submit" >Crear usuario</Button>
            </Form>

            {/* modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Creado</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modalMessage }</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        
    );
}

export default CrearUsuario;