import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
        if(usuario) {
            setFormData({
                nombre: usuario.nombre,
                correo_electronico: usuario.correo_electronico,
                contraseña: usuario.contraseña
            });
        } else {

        }
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/user/${usuario.id_documento}`);
                const data = await response.json();
                console.log(data.usuario);
                
                setFormData({
                    nombre: data.usuario.nombre,
                    correo_electronico: data.usuario.correo_electronico,
                    contraseña: usuario.contraseña
                });
                
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
        

        const dataToUpdate = {
            password: formData.contraseña,
        };

        console.log(dataToUpdate);

        try {
            const response = await fetch(`http://localhost:4000/api/userUpdate/${usuario.id_documento}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToUpdate),
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
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSumbit}>
            <input 
                type="text"
                name="nombre"
                value={ formData.nombre } 
                onChange={ handleChange }
            />

            <input 
                type="email"
                name="correo"
                value={ formData.correo_electronico } 
                onChange={ handleChange }
            />

            <input 
                type="password"
                name="contraseña"
                value={ formData.contraseña } 
                onChange={ handleChange }
            />

                

                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default ActualizarUsuario;