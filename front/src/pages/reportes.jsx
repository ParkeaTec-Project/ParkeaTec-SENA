import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import MostrarRol from '../components/MostrarRol';
import { Button } from 'react-bootstrap';
import exportarReportesPDF from './reportesPdf';

const Colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const formatFecha = (date) => {
    const fecha = new Date(date);
    return fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
};

const Reportes = () => {
    const [reservasDiarias, setReservasDiarias] = useState([]);
    const [vehiculosTipo, setVehiculosTipo] = useState([]);
    const [puestosUsados, setPuestosUsados] = useState([]);
    const [usuariosFrecuentes, setUsuariosFrecuentes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarReportes = async () => {
        try {
            //cargar reservas diarias
            const resReservas = await fetch('https://hnp5ds36-4000.use2.devtunnels.ms/api/reservasDiarias', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const dataReservas = await resReservas.json();
            const format = dataReservas.data.map(item => ({
                ...item,
                dia: formatFecha(item.dia)
            }));
            setReservasDiarias(format);

            //tipos vehiculos
            const resVehiculos = await fetch('https://hnp5ds36-4000.use2.devtunnels.ms/api/tipoVehiculo', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const dataVehiculos = await resVehiculos.json();
            setVehiculosTipo(dataVehiculos.data);

            //puesto usados
            const resPuestosUsados = await fetch('https://hnp5ds36-4000.use2.devtunnels.ms/api/obtenerPuestosUsados', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const dataPuestosUsados = await resPuestosUsados.json();
            setPuestosUsados(dataPuestosUsados.data);

            //usuarios frecuentes
            const resUsuariosFrecuentes = await fetch('https://hnp5ds36-4000.use2.devtunnels.ms/api/usuariosFrecuentes', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const dataUsuariosFrecuentes = await resUsuariosFrecuentes.json();
            setUsuariosFrecuentes(
                dataUsuariosFrecuentes.data.map(u => ({
                    ...u,
                    nombreCompleto: `${u.nombre} ${u.apellido}`
                }))
            );
        } catch (error) {
            console.error("Error cargando reportes:", error);
            setError("Hubo un problema al cargar los reportes");
        }
    };

    cargarReportes();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Reportes del parqueadero</h2>
            { error && <p style={{ color: "red" }}>{error}</p> }

            <MostrarRol rolesPermitidos={["admin", "vigilante"]}>
                <div style={{ marginBottom: 40 }}>
                <h3>Reservas por dia</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reservasDiarias}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill='#8884d8' name="Reservas" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3>Tipo de vehiculo mas usado</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={vehiculosTipo}
                            dataKey="total"
                            nameKey="tipo_vehiculo"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            { vehiculosTipo.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            { /* Puesto mas usados */ }
            <div style={{ marginBottom: 40 }}>
                <h3>Puesto mas usados</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={puestosUsados}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="numero_espacio" label={{ value: 'Puesto', position: 'insideBottom', offset: -5 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="veces_usado" fill='#00C49F' name="Veces usado" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Usuarios frecuentes */}
            <div>
                <h3>Usuarios mas frecuentes</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usuariosFrecuentes}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis  dataKey="nombreCompleto"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total_reservas" fill='#FF8042' name="Reservas realizadas" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            </MostrarRol>
            <Button
                variant='primary'
                onClick={() => exportarReportesPDF(reservasDiarias, vehiculosTipo, puestosUsados, usuariosFrecuentes)}
            >
                Descargar reporte PDF
            </Button>
        </div>
    );
};

export default Reportes;