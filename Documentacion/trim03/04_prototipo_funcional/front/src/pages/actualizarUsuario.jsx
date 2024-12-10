import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap"

function ActualizarUsuario({ usuario, handleUpdate }) {
    console.log("pruebaActualizarUsuario", usuario);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nombre: '',
        correo_electronico: '',
        contraseña: ''
    });

    useEffect(() => {
        console.log(id)
        
            const fetchUsuario = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/user/${usuario.id_documento}`);
                    const data = await response.json();
                    console.log(data.usuario);
                    
                    setFormData(data.usuario);
                    
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
                alert("Usuario actualizado correctamente");
            } else {
                alert("Error al actualizar el usuario");
            }
        } catch(error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };

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
                
                <Button variant="primary" type="submit" className="w-100">Actualizar</Button>
            </Form>
        </div>
    );
}

export default ActualizarUsuario;