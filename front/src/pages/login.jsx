import React, { useState } from "react";
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/login.module.css';

function Login({ session }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //Modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    //const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        const userData = {
            email,
            password
        };

        try {
            const response = await fetch("https://hnp5ds36-4000.use2.devtunnels.ms/api/login", 
                {
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
                    navigate('/Dashboard');
                }, 2000)

            } else {
                if (data.message === 'Usuario no encontrado') {
                    setEmailError('El correo ingresado no está registrado.');
                } else if (data.message === 'Contraseña incorrecta') {
                    setPasswordError('La contraseña ingresada es incorrecta.');
                }
                console.error("Error en el login:", data.message);
                setModalMessage("Error:" + data.message);
                //setShowModal(true);
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
                    <Form.Control type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } placeholder="name@example.com" isInvalid={!!emailError}/>
                    <Form.Text className="text-danger">{emailError}</Form.Text>
                </Form.Group>

                <Form.Group className={`mb-3 ${styles.input}`} controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={ password } onChange={ handleChangePassword } isInvalid={!!passwordError}/>
                    <Form.Text className="text-danger">{passwordError}</Form.Text>
                </Form.Group>

                <div className={`mt-3 ${styles.recuperarContraseña}`}>
                    <Link to={'/forgot-password'}>Olvidaste tu contraseña?</Link>
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