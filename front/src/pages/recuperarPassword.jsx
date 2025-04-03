// import React from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../styles/login.module.css';

// function RecuperarPassword(){
//     return(
//         <Container className={`mt-4 mb-7 ${styles.containerRecuperar}`}>
//             <h1 className="text-center">Recuperar Contraseña</h1>
//             <Form className={`mt-4 mb-7 ${styles.form}`}>
//                 <Form.Label className="mt-3">Correo electronico</Form.Label>
//                 <Form.Control className="mt-3" type="email"></Form.Control>
//                 <div>
//                     <Button className='mt-3 justify-content-center' variant="success" type='submit'>Enviar</Button>
//                 </div>
//             </Form>
//         </Container>
//     );
// }

// export default RecuperarPassword;

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RecuperarPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/reset-password?token=${token}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsValidToken(true);
        } else {
          setMessage({
            text: data.message || "Token invalido o expirado",
            type: "error",
          });
        }
      } catch (error) {
        setMessage({ text: "Error al verificar el token", type: "error" });
      }
    };

    if (token) {
      verifyToken();
    } else {
      setMessage({ text: "No se encontro token en la URL", type: "error" });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ text: "Las contraseñas no coinciden", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/reset-password-update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: data.message || "Contraseña actualizada correctamente",
          type: "success",
        });
        setTimeout(() => navigate("./login.jsx"), 2000);
      } else {
        setMessage({
          text: data.message || "Error al actualizar la contraseña",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Error de conexion", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  console.log("valid toke", isValidToken)

  if (!isValidToken && message.text) {
    return (
      <div>
        <h2>Restablecer Contraseña</h2>
        <p className={`message ${message.type}`}>{message.text}</p>
        <button onClick={() => navigate("./forgotPassword.jsx")}>
          Solicitar nuevo enlace
        </button>
      </div>
    );
  }

  return (
    <div className="password-reset-container">
      <h2>Restablecer Contraseña</h2>
      {message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
            <label>Confirmar Contraseña:</label>
            <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
        </div>

        <button type="submit" disabled={isLoading}>
            { isLoading ? "Procesando..." : "Actualizar Contraseña" }
        </button>
      </form>
    </div>
  );
};

export default RecuperarPassword;
