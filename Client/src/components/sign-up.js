import React from 'react';
import { Alert, Container, Row, Col, Form, Button, Tabs, Tab, InputGroup } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { SpinnerPage } from './spinner';

const ACCOUNT_TYPE_COMPANY = 'Company';
const ACCOUNT_TYPE_INTERPRETER = 'Interpreter';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      companyName: '',
      firstName: '',
      lastName: '',
      postcode: '',
      hourlyRate: 0,
      maxDistance: 0,
    };
  }

  submitHandler = event => accountType => {
    event.preventDefault();
    this.setState({ loading: true });

    const userAccount = {
      accountType,
      email: this.state.email,
      password: this.state.password,
    }
    this.props.accountSignUp(userAccount)
  };


  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // TODO: Extract these into separate components
  renderCompanySignUp = () => (
    <>
      <h3>Sign up - Company</h3>
      <Form onSubmit={this.submitHandler(ACCOUNT_TYPE_COMPANY)}>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Company name</Form.Label>
          <Form.Control name="companyName" placeholder="Company name" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Email address" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Confirm password" onChange={this.changeHandler} />
        </Form.Group>

        <Button variant="primary" type="submit" className="sign-in__button">Sign Up</Button>
        <Link to="/sign-in" className="sign-up__sign-in-link">Already got an account? Sign In</Link>
      </Form>
    </>
  );

  renderInterpreterSignUp = () => (
    <>
      <h3>Sign up - Interpreter</h3>
      <Form onSubmit={this.submitHandler(ACCOUNT_TYPE_INTERPRETER)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control name="firstName" placeholder="First name" onChange={this.changeHandler} />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control name="lastName" placeholder="Last name" onChange={this.changeHandler} />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Email address" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Confirm password" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formPostcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control name="postcode" placeholder="Postcode" onChange={this.changeHandler} />
          </Form.Group>

          <Form.Group as={Col} controlId="formHourlyRate">
            <Form.Label>Hourly rate</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="hourlyRate" type="number" placeholder="Hourly rate" onChange={this.changeHandler} />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formMaxDistance">
          <Form.Label>Maximum distance</Form.Label>
          <div className="sign-in__slider-container">
            <input
              type="range"
              className="sign-in__slider"
              name="maxDistance"
              min="0" max="100"
              value={this.state.maxDistance}
              onChange={this.changeHandler}
              step="1"/>
            <span className="sign-in__slider-text">{`${this.state.maxDistance} Miles`}</span>
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="sign-in__button">Sign Up</Button>
        <Link to="/sign-in" className="sign-up__sign-in-link">Already got an account? Sign In</Link>
      </Form>
    </>
  );

  renderSignUp = () => (
    <Row className="justify-content-md-center">
      <Col md="9" className="sign-in__column">
        <Tabs defaultActiveKey={ACCOUNT_TYPE_COMPANY} id="uncontrolled-tab-example">
          <Tab eventKey={ACCOUNT_TYPE_COMPANY} title={ACCOUNT_TYPE_COMPANY}>
            { this.renderCompanySignUp() }
          </Tab>
          <Tab eventKey={ACCOUNT_TYPE_INTERPRETER} title={ACCOUNT_TYPE_INTERPRETER}>
            { this.renderInterpreterSignUp() }
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );

  renderError = () => (
    <Alert variant="danger" dismissible>
      <Alert.Heading>Oops!</Alert.Heading>
      <span>{ this.props.account.error }</span>
    </Alert>
  );

  render() {
    return (
      <Container className="sign-in__container">
        {this.props.account.error && this.renderError()}
        {this.props.account.authenticated && <Redirect to="/" />}
        {this.props.account.loading ? <SpinnerPage /> : this.renderSignUp()}
      </Container>
    );
  }
}
