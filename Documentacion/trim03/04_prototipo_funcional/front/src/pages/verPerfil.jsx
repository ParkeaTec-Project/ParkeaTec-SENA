import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

function VerPerfil(){
    return(
        <Container className='mt-4 mb-5'>
            <h1>Perfil</h1>
            <Form className='mt-3 mb-7'>
                <Row className="mb-3">
                    <Col>
                    
                    </Col>
                    <Col>
                        <Form.Label >Nombre Completo</Form.Label>
                        <Form.Control className="mt-2" type="text" disabled placeholder="Juan Garnica"></Form.Control>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    
                    </Col>
                    <Col>
                        <Form.Label className="mt-2">Tipo Documento</Form.Label>
                        <Form.Control className="mt-2" type="text" disabled placeholder="Cedula de ciudadania"></Form.Control>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    
                    </Col>
                    <Col>
                        <Form.Label className="mt-2">Numero Documento</Form.Label>
                        <Form.Control className="mt-2" type="number" disabled placeholder="1098765432"></Form.Control>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    
                    </Col>
                    <Col>
                        <Form.Label className="mt-2">Correo electronico</Form.Label>
                        <Form.Control className="mt-2" type="email" disabled placeholder="juan@gmail.com"></Form.Control>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    
                    </Col>
                    <Col>
                        <Form.Label className="mt-2" mb-5>Rol</Form.Label>
                        <Form.Control className="mt-2 mb-5" type="Text" disabled placeholder="Aprendiz"></Form.Control>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default VerPerfil;

/*function UserInfo(){
  return (
    <Container>
      <h2 className="mb-4">Información del Usuario</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formUserName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formUserPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formUserAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserInfo;*/