import React from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SpinnerPage } from './spinner';

const ACCOUNT_TYPE_COMPANY = 'Company';
const ACCOUNT_TYPE_INTERPRETER = 'Interpreter';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: '',
      // password: '',
      loading: false,
    };
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    // TODO: Send data here
  };

  renderCompanySignUp = () => (
    <>
      <h3>Sign up - Company</h3>
      <Form onSubmit={this.submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={this.changeHandler} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={this.changeHandler} />
        </Form.Group>

        <Button variant="primary" type="submit" className="sign-in__button">
          Sign Up
        </Button>
        <Link to="/sign-in" className="sign-up__sign-in-link">
          Already got an account? Sign In
        </Link>
      </Form>
    </>
  );

  renderInterpreterSignUp = () => (
    <>
      <h3>Sign up - Interpreter</h3>
      <Link to="/sign-in" className="sign-up__sign-in-link">
        Already got an account? Sign In
      </Link>
    </>
  );

  renderSignUp = () => (
    <Row className="justify-content-md-center">
      <Col md="9" className="sign-in__column">
        <Tabs defaultActiveKey={ACCOUNT_TYPE_COMPANY} id="uncontrolled-tab-example">
          <Tab eventKey={ACCOUNT_TYPE_COMPANY} title={ACCOUNT_TYPE_COMPANY}>
            {this.renderCompanySignUp()}
          </Tab>
          <Tab eventKey={ACCOUNT_TYPE_INTERPRETER} title={ACCOUNT_TYPE_INTERPRETER}>
            {this.renderInterpreterSignUp()}
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );

  render() {
    return (
      <Container className="sign-in__container">
        {this.state.loading ? <SpinnerPage /> : this.renderSignUp()}
      </Container>
    );
  }
}
