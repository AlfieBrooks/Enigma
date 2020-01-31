import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import md5 from 'md5';

import { SpinnerPage } from './spinner';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.accountSignIn(this.state.email, this.state.password);
  };

  changeHandler = event => {
    const { type } = event.target;
    let { value } = event.target;
    if (type == "password"){
      value = md5(value)
    }
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
          <Link to="/sign-up" className="sign-in__sign-up-link">
            Or Sign Up
          </Link>
        </Form>
      </Col>
    </Row>
  );

  render() {
    return (
      <Container className="sign-in__container">
        {this.props.account.isAuthenticated && <Redirect to="/" />}
        {this.props.account.loading ? <SpinnerPage /> : this.renderSignIn()}
      </Container>
    );
  }
}

SignIn.propTypes = {
  account: PropTypes.shape({
    error: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  }),
  accountSignIn: PropTypes.func.isRequired,
};
