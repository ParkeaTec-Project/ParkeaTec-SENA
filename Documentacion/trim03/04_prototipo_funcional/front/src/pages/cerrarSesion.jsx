import React from "react";

function CerrarSesion () {
    
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
                console.log(data.message);
                alert("Se ha cerrado la sesion")
                window.location.href = "/login";
            } else {
                console.error("Error al cerrar sesion");
            }
        } catch (error) {
            console.error("Error de red:", error)
        }
    }

    return (
        <div>
            <h1>Bienvenido</h1>
            <button onClick={ cerrarSesion }>Cerrar sesion</button>
        </div>
    );
}

export default CerrarSesion;