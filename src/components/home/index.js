import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      region: 'US',
      isDropdownOpen: false,
      symbol: 'ETH',
      amount: '',
      recipient: '',
      note: '',
    };
  }

  toggleDropdown = () => {
    const {
      isDropdownOpen,
    } = this.state;

    this.setState({
      isDropdownOpen: !isDropdownOpen,
    });
  }

  selectSymbol = (symbol) => {
    this.setState({
      symbol,
    });
  }

  updateRegion = (e) => {
    this.setState({
      region: e.target.value,
    });
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render = () => {
    const {
      isDropdownOpen,
      region,
      symbol,
      amount,
      recipient,
      note,
    } = this.state;

    const paymentLink = `/payment?region=${region}&symbol=${symbol}&amount=${amount}&recipient=${recipient}&note=${note}`;

    return (
      <Container fluid>
        <Row className="pt-5 align-items-center justify-content-center">
          <Col className="text-center">
            <h1>Create a new payment</h1>
            <p className="text-muted">
              Use this form to create a new payment request
            </p>
          </Col>
        </Row>
        <Row className="pt-2 align-items-center justify-content-center">
          <Col xs="12" sm="10" md="8" lg="5">
            <Row>
              <Col className="text-right">
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="region" value="US" onChange={this.updateRegion} />
                    {' '}
                    US (Venmo app)
                  </Label>
                </FormGroup>
              </Col>
              <Col className="text-left">
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="region" value="EUR" onChange={this.updateRegion} disabled />
                    {' '}
                    Europe (Revolut app)
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="py-4 justify-content-center">
          <Col xs="12" sm="10" md="8" lg="5">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="amount">Requested amount</Label>
                      <InputGroup>
                        <Input
                          type="number"
                          name="amount"
                          id="amount"
                          placeholder="1"
                          bsSize="lg"
                          onChange={this.handleOnChange}
                          value={amount}
                        />
                        <InputGroupAddon addonType="append">
                          {region === 'US' ? (
                            'USD'
                          ) : (
                            'EUR'
                          )}
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-center">
                  <Col xs="12" sm="8" md="8">
                    <FormGroup>
                      <Label for="recipient">Recipient address (or ENS)</Label>
                      <Input
                        type="text"
                        name="recipient"
                        id="recipient"
                        placeholder="Recipient address"
                        bsSize="lg"
                        value={recipient}
                        onChange={this.handleOnChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="4" md="4">
                    <FormGroup>
                      <Label for="token">Crypto</Label>
                      <Dropdown isOpen={isDropdownOpen} toggle={this.toggleDropdown}>
                        <DropdownToggle caret>
                          <img src={`${process.env.PUBLIC_URL}/img/tokens/${symbol}.png`} alt={`${symbol}`} className="token__logo" />
                          {' '}
                          {`${symbol}`}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => this.selectSymbol('ETH')}>
                            <img src={`${process.env.PUBLIC_URL}/img/tokens/ETH.png`} alt="ETH" className="token__logo" />
                            {' '}
                            ETH
                          </DropdownItem>
                          <DropdownItem onClick={() => this.selectSymbol('DAI')}>
                            <img src={`${process.env.PUBLIC_URL}/img/tokens/DAI.png`} alt="DAI" className="token__logo" />
                            {' '}
                            DAI
                          </DropdownItem>
                          <DropdownItem onClick={() => this.selectSymbol('MKR')}>
                            <img src={`${process.env.PUBLIC_URL}/img/tokens/MKR.png`} alt="MKR" className="token__logo" />
                            {' '}
                            MKR
                          </DropdownItem>
                          <DropdownItem onClick={() => this.selectSymbol('SPANK')}>
                            <img src={`${process.env.PUBLIC_URL}/img/tokens/SPANK.png`} alt="SPANK" className="token__logo" />
                            {' '}
                            SPANK
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup className="payment__note">
                      <Label for="exampleText">Note</Label>
                      <Input
                        type="textarea"
                        name="note"
                        id="note"
                        placeholder="Pizza, beers, ..."
                        value={note}
                        onChange={this.handleOnChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="py-2 align-items-center justify-content-center">
          <Col className="text-center" xs="6" sm="6" md="4" lg="4">
            <NavLink exact to={paymentLink} className="nav-link btn btn-primary btn-lg btn-block">
              Create payment
            </NavLink>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
