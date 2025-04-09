import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CerrarSesion from '../pages/cerrarSesion';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';
import logo from '../assets/logo-parkeaTec.svg';

const Header = () => (
  <Navbar className={`justify-content-between ${styles.header} `} variant="dark" expand="lg">
    <Container className={`${styles.container}`}>
    <img src={`${logo}`} className={`${styles.imgLogo}`} alt='logoParqueTec'/>
      <Navbar.Brand href="#home">ParkeaTec</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            <NavDropdown title='Formulario'>
                <NavDropdown.Item as={Link} to={"/Formulario"}>
                  Llenar Formulario
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={""}>
                  Revisar Formulario
                </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/reportes">Reportes</Nav.Link>
            <NavDropdown title='Parqueadero'>
              <NavDropdown.Item as={Link} to="">Asignar Espacios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/EspaciosParqueadero">Ver Espacios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">Generar Strikes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Perfil'>
              <NavDropdown.Item as={Link} to="">Generar QR</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/verPerfil" className={`${styles.linkItemLogin}`}>
                Ver Perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">Hacer Reserva</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MiVehiculo">Mis Vehiculos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">Registrar Usuarios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">Strikes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">Mis Facturas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">Historial</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/usuarios" className={`${styles.linkItemLogin}`}>
                Ver usuarios
              </NavDropdown.Item>
              <NavDropdown.Item href='#'> <CerrarSesion /> </NavDropdown.Item>
            </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default Header;