import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class SignUp extends React.Component {
  render() {
    return (
      <Container className="sign-up__container">
        <Row className="justify-content-md-center">
          <Col md="5" className="sign-up__column">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="sign-up__button">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
