import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';

const Header = () => (
  <Navbar className={`justify-content-end ${styles.header} `} variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">ParkeaTEC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            <NavDropdown title='Formulario'>
                <NavDropdown.Item href='#'>Llenar Formulario</NavDropdown.Item>
                <NavDropdown.Item href='#'>Revisar Formulario</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Reportes</Nav.Link>
            <NavDropdown title='Parqueadero'>
              <NavDropdown.Item href='#'>Asignar Espacios</NavDropdown.Item>
              <NavDropdown.Item href='#'>Ver Espacios</NavDropdown.Item>
              <NavDropdown.Item href='#'>Generar Strikes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Perfil'>
              <NavDropdown.Item href='#'>Generar QR</NavDropdown.Item>
              <NavDropdown.Item href='#'>
                <Link to="/verPerfil">Ver Perfil</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href='#'>Hacer Reserva</NavDropdown.Item>
              <NavDropdown.Item href='#'>Mis Vehiculos</NavDropdown.Item>
              <NavDropdown.Item href='#'>Registrar Usuarios</NavDropdown.Item>
              <NavDropdown.Item href='#'>Strikes</NavDropdown.Item>
              <NavDropdown.Item href='#'>Mis Facturas</NavDropdown.Item>
              <NavDropdown.Item href='#'>Historial</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/usuarios">Ver usuarios</Link>
              </NavDropdown.Item>
              
              <NavDropdown.Item href='#'>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default Header;