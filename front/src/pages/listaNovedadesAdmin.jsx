import React, { useEffect, useState } from "react";
import { Button, Table } from 'react-bootstrap';
import styles from "../styles/listaNovedadesAdmin.module.css";

function ListaNovedadesAdmin() {
    const [novedades, setNovedades] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerNovedades = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/verNovedadesAdmin', {
                    credentials: "include"
                });

                const data = await response.json();
                setNovedades(Array.isArray(data.data) ? data.data : []);
                // console.log("datos novedad admin", data.data);
                // setNovedades(data.data);
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar las novedades", error);
                setCargando(false);
            }
        };

        obtenerNovedades();
    }, []);

    const registrarStrike = async (novedad) => {
        try {
            const response = await fetch('http://localhost:4000/api/registroStrike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    id_usuario: novedad.id_usuario,
                    id_vehiculo: novedad.id_vehiculo,
                    id_reserva: novedad.id_reserva,
                    descripcion: novedad.descripcion,
                    id_novedad: novedad.id_novedad
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setNovedades(prev => 
                    prev.map(n => n.id_novedad === novedad.id_novedad ? { ...n, strike_registrado: true, estado: "aprobado" } : n)
                );
            } else {
                alert(data.message || "Error al registrar el strike");
            }
        } catch (error) {
            console.error("Error registrando el strike", error);
            alert("Error al registrar el strike");
        }
    };

    const rechazarNovedad = async (novedad) => {
        try {
            const response = await fetch('http://localhost:4000/api/rechazarNovedad', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ id_novedad: novedad.id_novedad})
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setNovedades(prev => 
                    prev.map(n => n.id_novedad === novedad.id_novedad ? { ...n, estado: "rechazado" } : n)
                );
            } else {
                alert(data.message || "Error al rechazar la novedad");
            }
        } catch (error) {
            console.error("Error al rechazar la novedad", error);
            alert("Error al rechazar la novedad");
        }
    };

    if (cargando) return <p>Cargando novedades...</p>;

    return (
        <section className={`${styles.section}`}>
            <div className="container mt-4">
            <h3>Lista de novedades</h3>
            { novedades.length === 0 ? (
                <p>No hay novedades registradas por parte de los vigilantes</p>
            ) : (
                <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Vehiculo</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {novedades.map((novedad) => (
                        <tr key={novedad.id_novedad}>
                            <td>{novedad.id_novedad}</td>
                            <td>{novedad.id_usuario}</td>
                            <td>{novedad.id_vehiculo}</td>
                            <td>{novedad.descripcion}</td>
                            <td>{novedad.estado}</td>
                            <td>
                                <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => registrarStrike(novedad)}
                                    disabled={novedad.estado === 'aprobado' || novedad.estado === 'rechazado'}
                                >
                                    Aceptar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => rechazarNovedad(novedad)}
                                    disabled={novedad.estado === 'aprobado' || novedad.estado === 'rechazado'}
                                >
                                    Rechazar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </div>
        </section>
        
    );
}

export default ListaNovedadesAdmin;