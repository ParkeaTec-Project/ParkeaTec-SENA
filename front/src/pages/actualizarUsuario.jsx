import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap"

function ActualizarUsuario({ usuario, handleUpdate, obtenerUsuario }) {
    console.log("pruebaActualizarUsuario", usuario);
    const [formData, setFormData] = useState({
        nombre: usuario.nombre,
        // apellido: usuario.apellido,
        correo: usuario.correo_electronico,
        password: "",
        // rol: usuario.rol,
        rol_id: usuario.rol_id,
    });
    console.log("FormData", formData);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const dataToSend = {
            nombre: formData.nombre,
            correo: formData.correo,
            rol_id: formData.rol_id
        }

        if (formData.password.trim() !== "") {
            dataToSend.password = formData.password;
        }

        console.log("Datos a enviar:", dataToSend);

        try {
            //
            const response = await fetch(`https://hnp5ds36-4000.use2.devtunnels.ms/api/userUpdate/${usuario.id_documento}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend),
            });

            if(response.ok) {
                setModalMessage("Usuario actualizado correctamente");
                setShowModal(true);
                obtenerUsuario();
            } else {
                const errorData = await response.json(); // Para ver el error del backend
                console.error("Error del backend:", errorData);
                setModalMessage("Error al actualizar el usuario");
                setShowModal(false);
            }
        } catch(error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <h2 className="text-center mb-4">Editar Usuario</h2>
            <Form onSubmit={handleSumbit}>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text"
                        name="nombre"
                        value={ formData.nombre } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCorreo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                        type="email"
                        name="correo"
                        value={ formData.correo } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Nueva contraseña"
                        name="password"
                        value={ formData.password }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                        name="rol_id"
                        value={ formData.rol_id } 
                        onChange={ handleChange }
                    >
                        
                        <option value="1">Administrador</option>
                        <option value="2">Vigilante</option>
                        <option value="3">Usuario</option>
                    </Form.Select>
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100">Actualizar</Button>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizado</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modalMessage }</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ActualizarUsuario;