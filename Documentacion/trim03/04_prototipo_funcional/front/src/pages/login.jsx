import React, { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styles from '../styles/login.module.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [userData, setUserData] = useState(null)

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:4000/api/userLogin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));

            if(response.ok) {
                console.log("Login exitoso:", data);
                console.log("sesion:", data.sesion.user_id);
                //setUserData(data.sesion.user_id);
                alert("Login exitoso");
                window.location.href = '/crearUsuario';
            } else {
                console.error("Error en el login:", data.message);
                alert("Error:" + data.message);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <Container className={`${styles.container}`}>
            <h1>Login</h1>
            <Form onSubmit={ handleSubmit } className={`${styles.form}`}>
                <Form.Group className={`mb-3 ${styles.input}`} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={ email } onChange={ handleChangeEmail } placeholder="name@example.com"/>
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

        </Container>
    );
}

export default Login;