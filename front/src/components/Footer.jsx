import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/header.module.css';

function Footer() {
  return (
    <footer className={`text-white py-3 bottom-0 w-100 ${styles.footer}`}>
      <Container>
        <Row>
          <Col>
            <p className="text-center">&copy; 2024  ParkeaTec</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;