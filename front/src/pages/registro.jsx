import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styles from '../styles/registroUsuario.module.css';

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
                setModalMessage("Registro exitoso");
                setShowModal(true);
                console.log("Usuario Creado", result);
            } else {
                setModalMessage("Error", result.message);
                setShowModal(false);
            }
        } catch(error) {
            console.log("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor");
        };
    }

    const handleCloseModal = () => setShowModal(false);

    return(
        <Container className={`mt-4 mb-4 py-5 ${styles.container}`}>
            <h1>Registro Aprendiz</h1>
            <Form className='mt-5 mb-4' onSubmit={ handleSubmit }>
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Nombres</Form.Label>
                        <Form.Control 
                            className={`mt-1 ${styles.input} `}
                            type='text'
                            name='nombre'
                            value={ formData.nombre }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Apellidos</Form.Label>
                        <Form.Control 
                            className={`mt-1 ${styles.input} `}
                            type='text'
                            name='apellido'
                            value={ formData.apellido }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Correo electronico</Form.Label>
                        <Form.Control 
                            className={`mt-1 ${styles.input} `}
                            type='email'
                            name='correo'
                            value={ formData.correo }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Contraseña</Form.Label>
                        <Form.Control 
                            className={`mt-1 ${styles.input} `}
                            type='password'
                            name='password'
                            value={ formData.password }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Telefono</Form.Label>
                        <Form.Control 
                            className={`mt-1 ${styles.input} `}
                            type='number'
                            name='telefono'
                            value={ formData.telefono }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Direccion</Form.Label>
                        <Form.Control 
                            className={`mt-1 ${styles.input} `}
                            type='text'
                            name='direccion'
                            value={ formData.direccion }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Tipo Documento</Form.Label>
                        <Form.Select 
                            className={`mt-1 ${styles.input} `}
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

                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Numero de documento</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='number'
                            name='id_documento'
                            value={ formData.id_documento }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
            
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Foto Usuario</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='file'
                            name='foto_usuario'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Centro Formacion</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='text'
                            name='centro_formacion'
                            value={ formData.centro_formacion }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Ficha Aprendiz</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='text'
                            name='ficha_aprendiz'
                            value={ formData.ficha_aprendiz }
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Firma Usuario</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='file'
                            name='firma_usuario'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Foto Documento</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='file'
                            name='foto_documento'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                    <Col className={`${styles.col}`}>
                        <Form.Label className='mt-1'>Foto Carnet</Form.Label>
                        <Form.Control
                            className={`mt-1 ${styles.input} `}
                            type='file'
                            name='foto_carnet'
                            onChange={ handleChange }
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Button className={`mt-3 ${styles.button}`} variant="success" type='submit'>Registrarse</Button>
            </Form>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrado</Modal.Title>
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

export default Registro;