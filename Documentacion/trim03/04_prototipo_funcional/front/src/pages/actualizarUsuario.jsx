import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ActualizarUsuario() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nombre: '',
        correo_electronico: '',
        contraseña: ''

    });

    useEffect(() => {
        console.log(id)
        const usuario = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/user/${id}`);
                const data = await response.json();
                console.log(data.usuario);
                
                setFormData(data.usuario);
                
            } catch (error) {
                console.error("Error al actualizar el usuario:", error)
            }
        };

        usuario();
    }, [id]);

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
            const response = await fetch(`http://localhost:4000/api/userUpdate/${id}`, {
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