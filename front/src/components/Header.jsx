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
                <NavDropdown.Item href='#'>
                  <Link to= "/Formulario"className={`${styles.linkItemLogin}`} >Llenar Formulario</Link>
                  </NavDropdown.Item>
                <NavDropdown.Item href='#' >Revisar Formulario</NavDropdown.Item>
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
                <Link to="/verPerfil" className={`${styles.linkItemLogin}`}>Ver Perfil</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href='#'>Hacer Reserva</NavDropdown.Item>
              <NavDropdown.Item href='#'>Mis Vehiculos</NavDropdown.Item>
              <NavDropdown.Item href='#'>Registrar Usuarios</NavDropdown.Item>
              <NavDropdown.Item href='#'>Strikes</NavDropdown.Item>
              <NavDropdown.Item href='#'>Mis Facturas</NavDropdown.Item>
              <NavDropdown.Item href='#'>Historial</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/usuarios" className={`${styles.linkItemLogin}`}>Ver usuarios</Link>
              </NavDropdown.Item>
              
              <NavDropdown.Item href='#'><CerrarSesion /></NavDropdown.Item>
            </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default Header;