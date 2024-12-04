import React, { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <Container>
            <h1>Login</h1>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={ email } onChange={ handleChangeEmail } placeholder="name@example.com"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={ password } onChange={ handleChangePassword } />
                </Form.Group>

                <Button variant="success" type="submit">Success</Button>
            </Form>

            <div className="mt-3">
                <Link to={'/recuperarPassword'}>Olvidaste tu contraseña?</Link>
            </div>
        </Container>
    );
}

export default Login;