import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

const Team = () => (
  <Container fluid>
    <Row className="pt-5 align-items-center justify-content-center">
      <Col className="text-center">
        <h1>Team</h1>
        <p className="text-muted">
          Hello from the team
        </p>
      </Col>
    </Row>
    <Row className="py-4 justify-content-center">
      <Col xs="12" sm="10" md="8" lg="5">
        <Card>
          <CardBody>
            <img src={`${process.env.PUBLIC_URL}/img/team.jpg`} alt="team" className="img-fluid" />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Team;
