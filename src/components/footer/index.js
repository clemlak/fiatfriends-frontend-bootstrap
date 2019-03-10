import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const Footer = () => (
  <Container fluid>
    <Row className="mt-5 align-items-center justify-content-center">
      <Col className="text-center">
        <p>
          Build with <span role="img">❤️</span> and <span role="img">☕️</span> by <span role="img">♦️</span> team during EthParis
        </p>
      </Col>
    </Row>
  </Container>
);

export default Footer;
