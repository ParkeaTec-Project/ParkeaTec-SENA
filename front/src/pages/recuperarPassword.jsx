import React, { useState, useEffect } from "react";
import { Container, Form, FormGroup, Row, Col, Button, Alert } from "react-bootstrap";
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
          alert : data.message || "Contraseña actualizada correctamente",
          type: "success"
          //text: data.message || "Contraseña actualizada correctamente",
          //type: "success",
        });
        setTimeout(() => navigate("/login"), 2000);
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
      <Container>
        <Form className="mb-5" onSubmit={handleSubmit}>
    <div className="password-reset-container">
      <h2>Restablecer Contraseña</h2>
      {message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}


            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
            className="mt-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />            
            <Form.Label className="mt-3">Confirmar contraseña</Form.Label>
            <Form.Control
            className="mt-2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

            <Button
            type="submit" disabled={isLoading}>
              { isLoading ? "Procesando..." : "Actualizar Contraseña"}
            </Button>
    </div>
        </Form>
      </Container>
  );
};

export default RecuperarPassword;
