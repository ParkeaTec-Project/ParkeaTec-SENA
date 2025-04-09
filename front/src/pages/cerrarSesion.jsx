import React from "react";
import styles from '../styles/header.module.css'
import { Modal } from 'react-bootstrap';
import { useState } from "react";

function CerrarSesion () {

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const cerrarSesion = async() => {
        try {
            const response = await fetch("http://localhost:4000/api/cerrarSesion", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                console.log(data.message);
                setModalMessage("Se ha cerrado la sesion");
                setShowModal(true);

                setTimeout(() => {
                    setShowModal(false);
                    //setIsAuthenticated(false);
                    window.location.href = "/login";
                }, 2000)
            } else {
                console.error("Error al cerrar sesion");
                setModalMessage("Error al cerrar la sesion");
            }
        } catch (error) {
            console.error("Error de red:", error)
        }
    }

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <span 
                className={`${styles.cerrarSesion}`} 
                onClick={ cerrarSesion }
                style={{ cursor: "pointer"}}
            >
                Cerrar Sesion
            </span>
            {/* <a href="!#" className={`${styles.cerrarSesion}`} onClick={ cerrarSesion }>Cerrar sesion</a> */}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sesion Cerrada</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modalMessage }</Modal.Body>
            </Modal>
        </div>
        
    );
}

export default CerrarSesion;