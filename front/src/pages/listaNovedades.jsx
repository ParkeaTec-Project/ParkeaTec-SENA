import React, {useEffect, useState} from "react";
import styles from "../styles/listaNovedades.module.css";

function ListaNovedades() {
    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const obtenerNovedades = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/obtenerNovedades', {
                    credentials: "include"
                });

                const data = await response.json();
                setNovedades(data.data);
            } catch (error) {
                console.error("Error al obtener las novedades:", error);
            }
        };

        obtenerNovedades();
    }, []);

    return (
        <section className={`${styles.section}`}>
            <div className="container mt-4">
            <h2>Mis novedades</h2>
            {novedades.length === 0 ? (
                <p>No has registrado novedades</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>vehiculo</th>
                            <th>descripcion</th>
                            <th>estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {novedades.map((novedad, idx) => (
                            <tr key={idx}>
                                <td>{new Date(novedad.fecha_strike).toLocaleString()}</td>
                                <td>{novedad.nombre_usuario}</td>
                                <td>{novedad.placa_vehiculo}</td>
                                <td>{novedad.descripcion}</td>
                                <td>{novedad.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )} 
        </div>
        </section>
        
    );
}

export default ListaNovedades;