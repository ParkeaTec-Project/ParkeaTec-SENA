import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Registro(){
    const [formData, setFormData] = useState({
        id_documento: "", //
        nombre: "", // 
        apellido: "",  //
        telefono: "", //
        direccion: "",
        correo: "", //
        password: "", //
        foto_usuario: null, //
        centro_formacion: "", //
        ficha_aprendiz: "", //
        firma_usuario: null, //
        foto_documento: null, //
        foto_carnet: null, //
        id_tipo_documento: "", //
        rol_id: "3",
    });


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
        console.log("prueba front", formData);

        const data = new FormData();
        console.log(data);

        Object.keys(formData).forEach(key => {
            data.append(key, formData[key])
        });

        try {
            const response = await fetch("http://localhost:4000/api/registro", {
                method: "POST",
                body: data,
                credentials: "include"
            });

            const result = await response.json();

            if(response.ok) {
                alert("Usuario Creado");
                console.log("Usuario Creado", result);
            } else {
                alert("Error", result.message);
            }
        } catch(error) {
            console.log("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor");
        };
    }

    return(
        <Container className='mt-4 mb-4 py-5'>
            <h1>Registro Aprendiz</h1>
            <Form className='mt-5 mb-4' onSubmit={ handleSubmit }>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Nombres</Form.Label>
                        <Form.Control 
                            className='mt-1' 
                            type='text'
                            name='nombre'
                            value={ formData.nombre }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                
                    <Col>
                        <Form.Label className='mt-1'>Apellidos</Form.Label>
                        <Form.Control 
                            className='mt-1' 
                            type='text'
                            name='apellido'
                            value={ formData.apellido }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Correo electronico</Form.Label>
                        <Form.Control 
                            className='mt-1' 
                            type='email'
                            name='correo'
                            value={ formData.correo }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Contraseña</Form.Label>
                        <Form.Control 
                            className='mt-1' 
                            type='password'
                            name='password'
                            value={ formData.password }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Telefono</Form.Label>
                        <Form.Control 
                            className='mt-1' 
                            type='number'
                            name='telefono'
                            value={ formData.telefono }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Direccion</Form.Label>
                        <Form.Control 
                            className='mt-1' 
                            type='text'
                            name='direccion'
                            value={ formData.direccion }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Tipo Documento</Form.Label>
                        <Form.Select 
                            className='mt-1'
                            name='id_tipo_documento'
                            value={ formData.id_tipo_documento }
                            onChange={ handleChange }
                        >
                            <option>Seleccione una opcion</option>
                            <option value="1">Cedula de ciudadania</option>
                            <option value='2'>Cedula de extranjería</option>
                            <option value='3'>Tarjeta de identidad</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Numero de documento</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='number'
                            name='id_documento'
                            value={ formData.id_documento }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Foto Usuario</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='file'
                            name='foto_usuario'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Centro Formacion</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='text'
                            name='centro_formacion'
                            value={ formData.centro_formacion }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Ficha Aprendiz</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='text'
                            name='ficha_aprendiz'
                            value={ formData.ficha_aprendiz }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Firma Usuario</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='file'
                            name='firma_usuario'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Foto Documento</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='file'
                            name='foto_documento'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Foto Carnet</Form.Label>
                        <Form.Control
                            className='mt-1'
                            type='file'
                            name='foto_carnet'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Button variant="success" type='submit'>Registrarse</Button>
            </Form>
        </Container>
    );
}

export default Registro;