import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';

const HeaderLogin = () => (
  <Navbar className={`justify-content-end ${styles.header} `} variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">ParkeaTEC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
                <Link to='/registro'>Registro</Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default HeaderLogin;