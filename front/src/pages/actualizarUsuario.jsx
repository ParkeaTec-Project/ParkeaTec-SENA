import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap"

function ActualizarUsuario({ usuario, handleUpdate, obtenerUsuario }) {
    console.log("pruebaActualizarUsuario", usuario);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo_electronico: '',
        contraseña: '',
        rol: '',
        rol_id: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        console.log(id)
        
            const fetchUsuario = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/user/${usuario.id_documento}`);
                    const data = await response.json();
                    console.log(data.usuario);
                    
                    setFormData(
                        data.usuario,
                    );
                    
                } catch (error) {
                    console.error("Error al actualizar el usuario:", error)
                }
            };
            fetchUsuario();
    }, [id, usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch(`http://localhost:4000/api/userUpdate/${usuario.id_documento}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                setModalMessage("Usuario actualizado correctamente");
                setShowModal(true);
                obtenerUsuario();
            } else {
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

                <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                        type="text"
                        name="apellido"
                        value={ formData.apellido }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCorreo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                        type="email"
                        name="correo_electronico"
                        value={ formData.correo_electronico } 
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContraseña">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password"
                        name="contraseña"
                        value={ formData.contraseña } 
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