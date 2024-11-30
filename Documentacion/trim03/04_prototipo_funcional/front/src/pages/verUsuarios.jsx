import React, { useEffect, useState } from "react";

function VerUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json();
            setUsuarios(data)
            console.log("Usuarios obtenidos:", data)
        } catch (error) {
            console.error("Error al obtener los usuarios:", error.message)
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const handleEdit = async (id) => {
        console.log(`Editar usuario con ID: ${id}`)
        window.location.href = `/editarUsuario/${id}`;
    };

    const handleDelete = async (id) => {
        console.log(`Borrar usuario con ID: ${id}`)

        try {
            const response = await fetch(`http://localhost:4000/api/userDelete/${id}`, {
                method: "DELETE",
            });

            if(response.ok) {
                alert("Usuario eliminado correctamente");
                setUsuarios(usuarios.filter((usuario) => usuario.id_documento !== id));
            } else {
                alert("Error al eliminar el usuario");
            }
        } catch (err) {
            console.error("Error al eliminar el usuario:", err)
        }
    };

    return (
        <div>
            <h2>Lista de usuarios</h2>
            <ul>
                { usuarios.map((usuario) => (
                    <div>
                        <li key={usuario.id_documento}>{usuario.nombre}</li>
                        <button onClick={() => handleEdit(usuario.id_documento)}>Editar</button>
                        <button onClick={() => handleDelete(usuario.id_documento)}>Borrar</button>
                    </div>
                    
                ))}
                
            </ul>
            
        </div>
    );
}

export default VerUsuarios;