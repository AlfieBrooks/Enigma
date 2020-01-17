import React from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { SpinnerPage } from './spinner';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signedIn: false,
    };
  }

  submitHandler = () => {
    event.preventDefault();
    this.props.accountSignIn(this.state.email, this.state.password);
  };

  changeHandler = event => {
    const { type, value } = event.target;
    this.setState({ [type]: value });
  };

  renderSignIn = () => (
    <Row className="justify-content-md-center">
      <Col md="5" className="sign-in__column">
        <h3>Sign In</h3>
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
            Sign In
          </Button>
          <Link to="/sign-up" className="sign-in__sign-up-link">Or Sign Up</Link>
        </Form>
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
        {this.props.account.loading ? <SpinnerPage /> : this.renderSignIn()}
      </Container>
    );
  }
}
