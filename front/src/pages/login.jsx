import React, { useState } from "react";
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/login.module.css';

function Login({ session }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    //const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            const data = await response.json();
            

            if(response.ok) {
                console.log("Login exitoso:", data);
                setModalMessage("Login exitoso");
                setShowModal(true);
                //setIsAuthenticated(true);
                await session();
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/crearUsuario');
                }, 2000)

            } else {
                console.error("Error en el login:", data.message);
                setModalMessage("Error:" + data.message);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor");
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className={`${styles.container}`}>
            <h1>Login</h1>
            <Form onSubmit={ handleSubmit } className={`${styles.form}`}>
                <Form.Group className={`mb-3 ${styles.input}`} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } placeholder="name@example.com"/>
                </Form.Group>

                <Form.Group className={`mb-3 ${styles.input}`} controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={ password } onChange={ handleChangePassword } />
                </Form.Group>

                <div className={`mt-3 ${styles.recuperarContraseña}`}>
                    <Link to={'/recuperarPassword'}>Olvidaste tu contraseña?</Link>
                </div>

                <Button variant="success" type="submit">Success</Button>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modalMessage }</Modal.Body>
            </Modal>
        </Container>
    );
}

export default Login;