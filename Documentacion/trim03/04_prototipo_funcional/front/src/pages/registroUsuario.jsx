import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function RegistroUsuario() {
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
        ficha_aprendiz: "",
        firma_usuario: "",
        foto_documento: "",
        foto_carnet: "",
        id_tipo_documento: "",
        rol_id: "3"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ 
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch("http://localhost:4000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok) {
                alert("Usuario Creado");
                console.log("Usuario Creado");
            } else {
                alert("Error", data.message);
            }
        } catch (error) {
            console.log("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor")
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h2 className="mb-4">Registro</h2>
            <Form onSubmit={ handleSubmit }>
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
                            placeholder="contraseña"
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
                        type="text"
                        placeholder="foto"
                        name="foto_usuario"
                        value={ formData.foto_usuario } 
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

                <Form.Group className="mb-3" controlId="ficha">
                    <Form.Label>Ficha</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ficha"
                        name="ficha_aprendiz"
                        value={ formData.ficha_aprendiz } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="firma">
                    <Form.Label>Firma Usuario</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Firma"
                        name="firma_usuario"
                        value={ formData.firma_usuario } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fotoDocumento">
                    <Form.Label>Foto del documento</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="foto documento"
                        name="foto_documento"
                        value={ formData.foto_documento } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fotoCarnet">
                    <Form.Label>Foto del Carnet</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="foto carnet"
                        name="foto_carnet"
                        value={ formData.foto_carnet } 
                        onChange={ handleChange }
                    />
                </Form.Group>

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

                {/* <Form.Group className="mb-3" controlId="rol">
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
                </Form.Group> */}

                <Button variant="success" type="submit">Crear usuario</Button>
            </Form>
            <button>
                <Link to="/login">Login</Link>
            </button>
        </Container>
        
    );
}

export default RegistroUsuario;