import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';


const Footer = () => (
  <footer className={`text-white py-3 position-fixed bottom-0 w-100 ${styles.footer}`}>
    <Container className="text-center">
      <p>© 2024 ParkeaTEC. Todos los derechos reservados.</p>
    </Container>
  </footer>
);

export default Footer;
