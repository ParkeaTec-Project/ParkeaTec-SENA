import React, { useState } from "react";
import {
  Button,
  Spinner,
  Container,
  Card,
  Alert,
  Form,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/forgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", variant: "" });

    try {
      const response = await fetch(
        "http://localhost:4000/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
        
      );
      console.log("email enviado", email)

      const data = await response.json();
      if (response.ok) {
        setShowSuccessModal(true);
        //setEmail(""); // Limpiar el campo después del envío exitoso
      } else {
        setMessage({
          text: data.message || "Ocurrió un error al procesar tu solicitud",
          variant: "danger",
        });
      }
      setMessage(data.message);
    } catch (error) {
      setMessage({
        text: "Error de conexión. Intenta nuevamente.",
        variant: "danger",
      });
      setMessage("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`${styles.section}`}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card
          className="shadow-sm p-3 p-md-4"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <Card.Body>
            <div className="text-center mb-4">
              <i
                className="bi bi-envelope-check text-primary"
                style={{ fontSize: "3rem" }}
              ></i>
              <h2 className="mt-3">Recuperar Contraseña</h2>
              <p className="text-muted">
                Te enviaremos un enlace seguro para restablecer tu contraseña
              </p>
            </div>

            {message.text && (
              <Alert variant={message.variant} className="text-center">
                <i
                  className={`bi ${
                    message.variant === "danger"
                      ? "bi-exclamation-triangle"
                      : "bi-check-circle"
                  } me-2`}
                ></i>
                {message.text}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                className="w-100 py-2"
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Enviar Enlace
                  </>
                )}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <Link to="/login" className="text-decoration-none">
                <i className="bi bi-arrow-left me-2"></i>
                Volver al inicio de sesión
              </Link>
            </div>
          </Card.Body>
        </Card>

        {/* Modal de éxito */}
        <Modal
          show={showSuccessModal}
          onHide={() => {
            setShowSuccessModal(false);
            setEmail('')
          }} 
          centered
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h4 text-success">
              <i className="bi bi-check-circle-fill me-2"></i>
              ¡Enlace enviado!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <div className="mb-3">
              <i
                className="bi bi-envelope-open text-success"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h5 className="mb-3">Revisa tu correo electrónico</h5>
            <p>
              Hemos enviado un enlace para restablecer tu contraseña a {""}
              <strong>{email}</strong>. Si no lo ves en tu bandeja principal,
              revisa la carpeta de spam.
            </p>
            <p className="text-muted small mt-3">
              El enlace expirará en 15 minutos por seguridad.
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 justify-content-center">
            <Button
              variant="success"
              onClick={() => setShowSuccessModal(false)}
              className="px-4"
            >
              Entendido
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default ForgotPassword;