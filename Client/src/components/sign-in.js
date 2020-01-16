import React from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: false,
      email: '',
      password: '',
      signedIn: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.account && (nextProps.account.signInError || nextProps.account.authenticated)) {
      return { authenticating: false };
    } else {
      return null;
    }
  }

  submitHandler = () => {
    event.preventDefault();
    this.setState({ authenticating: true });
    this.props.accountSignIn(this.state.email, this.state.password);
  };

  changeHandler = event => {
    const { type, value } = event.target;
    this.setState({ [type]: value });
  };

  renderSignIn = () => {
    return (
      <Row className="justify-content-md-center">
        <Col md="5" className="sign-up__column">
          <Form onSubmit={this.submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.changeHandler} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.changeHandler} />
            </Form.Group>

            <Button variant="primary" type="submit" className="sign-up__button">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <Container className="sign-up__container">
        {this.props.account.error && <p>{this.props.account.error}</p>}
        {this.props.account.authenticated && <Redirect to="/" />}
        {this.state.authenticating ? <Spinner animation="border" /> : this.renderSignIn()}
      </Container>
    );
  }
}
