import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import styles from '../styles/verUsuarios.module.css';
import ActualizarUsuario from "./actualizarUsuario";

function VerUsuarios({ actualizarUsuario }) {
    const [showModal, setShowModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    //Modal
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    console.log("userPrueba", usuarioSeleccionado);

    const obtenerUsuarios = async () => {
        try {
            //
            const response = await fetch("https://hnp5ds36-4000.use2.devtunnels.ms/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include" //incluye las cookies de sesion
            });

            if(response.ok) {
                const data = await response.json();
                setUsuarios(data.usuarios);
                console.log("Usuarios obtenidos:", data.usuarios)
            } else if (response.status === 401) {
                alert("Inicia sesion primero para acceder a esta seccion")
                window.location.href = "/login"
            }
            
        } catch (error) {
            console.error("Error al obtener los usuarios:", error.message)
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    useEffect(() => {
        // Este useEffect se ejecutará cuando el estado 'usuarioSeleccionado' cambie.
        console.log("usuarioSeleccionado cambió:", usuarioSeleccionado);
    }, [usuarioSeleccionado]);

    const handleEdit = async (usuario) => {
        console.log("Usuario editado:", usuario);
        setUsuarioSeleccionado(usuario);
        setShowModal(true);
    };

    const handleUpdate = async (usuarioActualizado) => {
        try {
            await actualizarUsuario(usuarioActualizado);
            setShowModal(false);
        } catch (error) {
            console.error("Error al actualizar el usuario", error)
        }
    }

    const handleDelete = async (id) => {
        console.log(`Borrar usuario con ID: ${id}`)

        try {
            const response = await fetch(`https://hnp5ds36-4000.use2.devtunnels.ms/api/userDelete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if(response.ok) {
                setModalMessage("Usuario eliminado correctamente");
                setShowModalDelete(true);
                setUsuarios(usuarios.filter((usuario) => usuario.id_documento !== id));
            } else {
                setModalMessage("Error al eliminar el usuario");
                setShowModalDelete(false);
            }
        } catch (err) {
            console.error("Error al eliminar el usuario:", err)
        }
    };

    const handleCloseModal = () => setShowModalDelete(false);

    return (
        <div>
            <h2 className={`${styles.title}`}>Lista de usuarios</h2>
            <Table striped bordered hover className={`text-center align-middle ${styles.table}`}>
                <thead>
                    <tr>
                        <th>nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { usuarios.map((usuario) => (
                        <tr key={usuario.id_documento}>
                            <td className={`${styles.td}`}>{ usuario.nombre }</td>
                            <td className={`${styles.td}`}>{ usuario.apellido }</td>
                            <td className={`${styles.td}`}>{ usuario.correo_electronico }</td>
                            <td className={`${styles.td}`}>{ usuario.rol }</td>
                            <td className={`${styles.td}`}>
                                <Button className="m-1" variant="success" onClick={() => handleEdit(usuario)}>Editar</Button>

                                <Button className="m-1" variant="danger" onClick={() => handleDelete(usuario.id_documento)}>Borrar</Button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </Table>
            <div className={`${styles.contentBtn}`}>
                <Button variant="success">
                    <Link to="/crearUsuario">Crear Usuario</Link>
                </Button>
            </div>

            {/*Modal para actualizar el usuario */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Actualizar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { usuarios && (
                        <div className="p-3">
                            <ActualizarUsuario 
                                usuario={ usuarioSeleccionado }
                                handleUpdate={ handleUpdate }
                                obtenerUsuario={ obtenerUsuarios }
                            />
                        </div>
                        
                    ) }
                </Modal.Body>
            </Modal>

            {/* Modal delete */}
            <Modal show={showModalDelete} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminado</Modal.Title>
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

export default VerUsuarios;