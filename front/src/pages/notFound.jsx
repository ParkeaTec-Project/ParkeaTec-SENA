import React from "react";
import { Container, Button } from "react-bootstrap";
import styles from "../styles/notFound.module.css";
import Lottie from "lottie-react";
import animation from "../assets/noFound.json"
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className={styles.container}>
            <div className={styles.lottieWrapper}>
                <Lottie animationData={animation} loop={true}/>
            </div>
            <p className={styles.text}>No pudimos encontrar la pagina que buscabas</p>
            <Button className={styles.overlayButton} onClick={() => navigate('/')}>
                Volver al inicio
            </Button>
        </Container>
    );
};

export default NotFound;