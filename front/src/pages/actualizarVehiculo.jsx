import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

function ActualizarVehiculo({ vehiculo, handleUpdate, obtenerVehiculo }) {
    console.log("pruebaActualizarVehiculo");
    const [formData, setFormData] = useState({
        color: vehiculo.color,
        observacion: vehiculo.observacion,
    });
    console.log("formData", formData);

    //const [filePreview, setFilePreview] = useState(vehiculo.foto_vehiculo);
    const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setSelectedFile(file);
    //         setFilePreview(URL.createObjectURL(file));
    //     }
    // };

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
  form.append("color", formData.color);
  form.append("observacion", formData.observacion);
  if (selectedFile) {
    form.append("foto_vehiculo", selectedFile);
  }

  console.log("form", form);

        try {
            const response = await fetch(`http://localhost:4000/api/updateVehiculo/${vehiculo.id_documento}`, {
                method: "PUT",
                credentials: "include",
                body: form,
            });

            if (response.ok) {
                setModalMessage("Vehiculo actualizado");
                setShowModal(true);
                obtenerVehiculo();
            } else {
                setModalMessage("Error al actualizar el vehiculo");
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error al actualizar el vehiculo:", error);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <h2 className="text-center mb-4">Editar vehiculo</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                        type="text"
                        name="color"
                        value={ formData.color }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formObservacion">
                    <Form.Label>Observacion</Form.Label>
                    <Form.Control
                        type="text"
                        name="observacion"
                        value={ formData.observacion }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFotoVehiculo">
                    <Form.Label>Foto vehiculo</Form.Label>
                    <Form.Control
                        type="file"
                        name="foto_vehiculo"
                        onChange={ (e) => setSelectedFile(e.target.files[0]) }
                        accept="image/*"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Actualizar</Button>
            </Form>

            <Modal show={ showModal } onHide={handleCloseModal}>
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
    )
}

export default ActualizarVehiculo;

