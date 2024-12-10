import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/login.module.css';

function RecuperarPassword(){
    return(
        <Container className={`mt-4 mb-7 ${styles.containerRecuperar}`}>
            <h1 className="text-center">Recuperar Contraseña</h1>
            <Form className={`mt-4 mb-7 ${styles.form}`}>
                <Form.Label className="mt-3">Correo electronico</Form.Label>
                <Form.Control className="mt-3" type="email"></Form.Control>
                <div>
                    <Button className='mt-3 justify-content-center' variant="success" type='submit'>Enviar</Button>
                </div>
            </Form>
        </Container>
    );
}

export default RecuperarPassword;