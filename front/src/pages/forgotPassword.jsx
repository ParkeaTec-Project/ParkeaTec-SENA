import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:4000/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Error al procesar la solicitud");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <p>Ingresa tu correo electronico para recibir el enlace de recuperacion</p>

            { message && <p>{ message }</p> }

            <form onSubmit={ handleSubmit }>
                <label>Correo Electronico:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    { isLoading ? "Enviando..." : "Enviar Enlace" }
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;