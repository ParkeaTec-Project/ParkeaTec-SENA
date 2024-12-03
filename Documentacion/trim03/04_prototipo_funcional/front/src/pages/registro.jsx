import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

function Registro(){
    return(
        <Container className='mt-4'>
            <h1>Registro Aprendiz</h1>
            <Form className='mt-5'>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Nombres</Form.Label>
                        <Form.Control className='mt-1' type='text'></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Correo electronico</Form.Label>
                        <Form.Control className='mt-1' type='email'></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Apellidos</Form.Label>
                        <Form.Control className='mt-1' type='text'></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Contraseña</Form.Label>
                        <Form.Control className='mt-1' type='password'></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Tipo Documento</Form.Label>
                        <Form.Select className='mt-1'>
                            <option>Seleccione una opcion</option>
                            <option value="1">Cedula de ciudadania</option>
                            <option value='2'>Cedula de extranjería</option>
                            <option value='3'>Tarjeta de identidad</option>
                            <option value='4'>NIT</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label className='mt-1'>Confirmar Constraseña</Form.Label>
                        <Form.Control className='mt-1' type='Password'></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className='mt-1'>Numero de documento</Form.Label>
                        <Form.Control type='number' className='mt-1'></Form.Control>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Registro;