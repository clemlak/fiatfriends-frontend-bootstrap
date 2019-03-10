import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import QRCode from 'qrcode.react';

class Payment extends Component {
  constructor(props) {
    super(props);

    const request = new URLSearchParams(this.props.location.search);

    this.state = {
      region: request.get('region'),
      note: request.get('note'),
      symbol: request.get('symbol'),
      amount: request.get('amount'),
      recipient: request.get('recipient'),
      liquidityProvider: 'NoahZinsmeister',
    };
  }

  render = () => {
    const {
      region,
      note,
      symbol,
      amount,
      recipient,
      liquidityProvider,
    } = this.state;

    const data = JSON.stringify({
      recipient,
      recipientCurrency: symbol,
      note,
    });

    const deeplink = `venmo://paycharge?txn=pay&recipients=${liquidityProvider}&amount=${amount}&note=FiatFriends: ${data}`;

    return (
      <Container fluid>
        <Row className="pt-5 align-items-center justify-content-center">
          <Col className="text-center">
            <h1>Here is your payment request</h1>
            <p className="text-muted">
              Scan this with your phone to initiate the payment
            </p>
          </Col>
        </Row>
        <Row className="py-4 justify-content-center">
          <Col xs="12" sm="10" md="8" lg="5">
            <Card>
              <CardBody>
                {region === 'US' ? (
                  <Row>
                    <Col className="text-center">
                      <QRCode value={deeplink} size={parseInt('256', 10)} className="payment__qrcode" />
                      <br />
                      <a href={deeplink}>Trigger payment</a>
                    </Col>
                  </Row>
                ) : (
                  <div>
                    <Row>
                      <Col>
                        <p className="lead">
                          Step 1
                        </p>
                        <p>
                          Copy this
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="lead">
                          Step 2
                        </p>
                        <p>
                          Blablabla
                        </p>
                      </Col>
                    </Row>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center">
          <Col className="text-center" xs="6" sm="6" md="4" lg="4">
            <NavLink exact to="/" className="nav-link">
              <small>Create a new payment</small>
            </NavLink>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Payment;
