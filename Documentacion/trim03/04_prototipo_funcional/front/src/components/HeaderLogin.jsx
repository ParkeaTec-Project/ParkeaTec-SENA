import React from 'react';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';

const HeaderLogin = () => (
  <Navbar className={`justify-content-end ${styles.header} `} variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">ParkeaTEC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown.Item className='mx-5'>
              <Link to='/registro' className={`${styles.linkItem}`}>Registro</Link>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <Link to='/login' className={`${styles.linkItem}`}>Login</Link>
            </NavDropdown.Item>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default HeaderLogin;