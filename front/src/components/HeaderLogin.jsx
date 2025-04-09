import React from 'react';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';
import logo from '../assets/logo-parkeaTec.svg';

const HeaderLogin = () => (
  <Navbar className={`justify-content-between ${styles.header} `} variant="dark" expand="lg">
    <Container className={`${styles.container}`}>
      <img src={`${logo}`} className={`${styles.imgLogo}`} alt='logoParqueTec'/>
      <Navbar.Brand as={Link} to="#home">ParkeaTec</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/registro" className={`${styles.linkItem}`}>
              Registro
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={`${styles.linkItem}`}>
              Login
            </Nav.Link>
            {/* <NavDropdown.Item className='mx-5'>
              <Link to='/registro' className={`${styles.linkItem}`}>Registro</Link>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <Link to='/login' className={`${styles.linkItem}`}>Login</Link>
            </NavDropdown.Item> */}
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
);


export default HeaderLogin;