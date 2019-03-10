import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';
import firebase from 'firebase';

class History extends Component {
  constructor(props) {
    super(props);

    const request = new URLSearchParams(this.props.location.search);

    const config = {
      apiKey: 'AIzaSyA01UMyTQPEFmHvPc49LRm8J-cY185PDrE',
      authDomain: 'fiatfriends.firebaseapp.com',
      databaseURL: 'https://fiatfriends.firebaseio.com',
      projectId: 'fiatfriends',
      storageBucket: 'fiatfriends.appspot.com',
      messagingSenderId: '887264308370',
    };

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }

    this.database = firebase.database();

    this.state = {
      address: request.get('address'),
      transactions: [],
    };
  }

  componentDidMount = () => {
    this.getHistory();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      address,
    } = this.state;

    if (address !== prevState.address) {
      this.getHistory();
    }
  }

  getHistory = () => {
    const {
      address,
    } = this.state;

    const transactions = [];

    const venmo = firebase.database().ref('venmo');

    venmo.orderByChild('to').equalTo(address)
      .once('value', (res) => {
        res.forEach((data) => {
          const tx = {
            amount: data.val().amount,
            currencyFrom: data.val().currencyFrom,
            currencyTo: data.val().currencyTo,
            from: data.val().from,
            fromPicture: data.val().fromPicture,
            hash: data.val().hash,
            to: data.val().to,
            timestamp: data.val().timestamp,
            note: '',
          };

          transactions.push(tx);
        });

        this.setState({
          transactions,
        });
      });
  }

  displayTransactions = () => {
    const {
      transactions,
    } = this.state;

    if (transactions.length === 0) {
      return (
        <Col className="text-center">
          <p className="text-muted mb-0">
            You do not have any transaction yet...
          </p>
        </Col>
      );
    }

    const rows = [];

    for (let i = 0; i < transactions.length; i += 1) {
      rows.push(
        <ListGroupItem key={i}>
          <Row className="align-items-center justify-content-center">
            <Col className="text-center">
              <p className="mb-0">
                <span className="font-weight-bold">{transactions[i].amount}</span>
                <br />
                {transactions[i].currencyFrom}
              </p>
            </Col>
            <Col className="text-center">
              <p className="mb-0">
                <img src={transactions[i].fromPicture} alt="profile" className="rounded-circle history_pic" />
              </p>
            </Col>
            <Col className="text-center">
              <p className="mb-0">
                <img src={`${process.env.PUBLIC_URL}/img/tokens/${transactions[i].currencyTo}.png`} alt={`${transactions[i].currencyTo}`} className="history_pic" />
              </p>
            </Col>
            <Col className="text-center">
              <a href={`https://etherscan.io/tx/${transactions[i].hash}`} target="_blank" rel="noreferrer noopener">View tx</a>
            </Col>
          </Row>
        </ListGroupItem>,
      );
    }

    return (
      <Col>
        <ListGroup>
          {rows}
        </ListGroup>
      </Col>
    );
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render = () => {
    const {
      address,
    } = this.state;

    return (
      <Container fluid>
        <Row className="pt-5 align-items-center justify-content-center">
          <Col className="text-center">
            <h1>History</h1>
            <p className="text-muted">
              All your previous transactions are here
            </p>
          </Col>
        </Row>
        <Row className="py-4 align-items-center justify-content-center">
          <Col xs="12" sm="10" md="8" lg="5">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="recipient">Your address</Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="address"
                        bsSize="lg"
                        value={address}
                        onChange={this.handleOnChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {this.displayTransactions()}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default History;
