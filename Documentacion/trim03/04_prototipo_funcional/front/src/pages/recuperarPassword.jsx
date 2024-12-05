import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Link } from "react-router-dom";

function RecuperarPassword(){
    return(
        <Container className='mt-4 mb-7'>
            <h1 className="text-center">Recuperar Contraseña</h1>
            <Form className='mt-4 mb-7'>
                <Form.Label className="mt-3">Correo electronico</Form.Label>
                <Form.Control className="mt-3" type="email"></Form.Control>
                <div>
                    <Button className='mt-5 justify-content-center' variant="success" type='submit'>Enviar</Button>
                </div>
            </Form>
        </Container>
    );
}

export default RecuperarPassword;