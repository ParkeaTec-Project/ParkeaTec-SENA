import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => (
  <footer className="bg-dark text-white py-3 position-fixed bottom-0 w-100">
    <Container className="text-center">
      <p>© 2024 Mi Aplicación. Todos los derechos reservados.</p>
    </Container>
  </footer>
);

export default Footer;
