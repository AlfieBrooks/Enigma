import React from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useInput } from '../utils/input-hook';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';

export function InterpreterSignUp({ submitHandler }) {
  const { bind: bindFirstName } = useInput();
  const { bind: bindLastName } = useInput();
  const { bind: bindEmail } = useInput();
  const { bind: bindPassword } = useInput();
  const { bind: bindConfirmPassword } = useInput();
  const { bind: bindPostcode } = useInput();
  const { bind: bindHourlyRate } = useInput(0);
  const { value: maxDistance, bind: bindMaxDistance } = useInput(0);

  const handleSubmit = e => {
  console.log('Log: InterpreterSignUp -> e', e);
    e.preventDefault();
    submitHandler(ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER);
  }

  return (
    <>
      <h3>Sign up - Interpreter</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control name="firstName" placeholder="First name" {...bindFirstName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control name="lastName" placeholder="Last name" {...bindLastName} />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Email address" {...bindEmail} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" {...bindPassword} />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Confirm password" {...bindConfirmPassword} />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formPostcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control name="postcode" placeholder="Postcode" {...bindPostcode} />
          </Form.Group>

          <Form.Group as={Col} controlId="formHourlyRate">
            <Form.Label>Hourly rate</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="hourlyRate" type="number" placeholder="Hourly rate" {...bindHourlyRate} />
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
              step="1"
              value={maxDistance}
              {...bindMaxDistance}
            />
            <span className="sign-in__slider-text">{`${maxDistance} Miles`}</span>
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="sign-in__button">Sign Up</Button>
        <Link to="/sign-in" className="sign-up__sign-in-link">Already got an account? Sign In</Link>
      </Form>
    </>
  );
}
