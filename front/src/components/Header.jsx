import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CerrarSesion from '../pages/cerrarSesion';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';
import logo from '../assets/logo-parkeaTec.svg';
import MostrarRol from './MostrarRol';

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
            </NavDropdown>
            <MostrarRol rolesPermitidos={["admin", "vigilante"]}>
              <Nav.Link as={Link} to="/Reportes">Reportes</Nav.Link>
            </MostrarRol>
            
            <NavDropdown title='Parqueadero'>
              <NavDropdown.Item as={Link} to="/EspaciosParqueadero">Ver Espacios</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Perfil'>
              <NavDropdown.Item as={Link} to="/verPerfil" className={`${styles.linkItemLogin}`}>
                Ver Perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/VerReservas">Ver Reservas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MiVehiculo">Mis Vehiculos</NavDropdown.Item>
              <MostrarRol rolesPermitidos={["admin"]}>
                <NavDropdown.Item as={Link} to="/crearUsuario">Registrar Usuarios</NavDropdown.Item>
              </MostrarRol>
              
              <MostrarRol rolesPermitidos={["vigilante"]}>
                <NavDropdown.Item as={Link} to="/ListaNovedades">Ver novedades</NavDropdown.Item>
              </MostrarRol>

              <MostrarRol rolesPermitidos={["admin"]}>
                <NavDropdown.Item as={Link} to="/ListaNovedadesAdmin">Strikes</NavDropdown.Item>
              </MostrarRol>
              
              <MostrarRol rolesPermitidos={["usuario"]}>
                <NavDropdown.Item as={Link} to="/StrikesUsuario">Mis Strikes</NavDropdown.Item>
              </MostrarRol>
             
              <MostrarRol rolesPermitidos={["admin"]}>
                <NavDropdown.Item as={Link} to="/usuarios" className={`${styles.linkItemLogin}`}>Ver usuarios</NavDropdown.Item>
              </MostrarRol>
             
              <NavDropdown.Item href='#'> <CerrarSesion /> </NavDropdown.Item>
            </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default Header;