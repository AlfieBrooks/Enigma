import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';
import { Link } from 'react-router-dom';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { useInput } from '../utils/input-hook';
import md5 from 'md5';

export function InterpreterSignUp({ submitHandler }) {
  const { value: firstName, bind: bindFirstName } = useInput();
  const { value: lastName, bind: bindLastName } = useInput();
  const { value: email, bind: bindEmail } = useInput();
  const { value: password, bind: bindPassword } = useInput();
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput();
  const { value: postcode, bind: bindPostcode } = useInput();
  const { value: hourlyRate, bind: bindHourlyRate } = useInput(0);
  const { value: maxDistance, bind: bindMaxDistance } = useInput(0);
  const { value: membershipId, bind: bindMembershipId } = useInput();
  const [membershipExpiry, setMembershipExpiry] = useState();
  const [focused, setFocused] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const userDetails = {
      accountType: ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER,
      firstName,
      lastName,
      email,
      password: md5(password),
      confirmPassword: md5(password),
      postcode,
      hourlyRate,
      maxDistance,
      membershipId,
      membershipExpiry,
    };

    submitHandler(userDetails);
  };

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
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...bindConfirmPassword}
          />
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
              <Form.Control name="hourlyRate" type="number" placeholder="Hourly rate" max="10000" {...bindHourlyRate} />
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
              min="0"
              max="100"
              step="1"
              value={maxDistance}
              {...bindMaxDistance}
            />
            <span className="sign-in__slider-text">{`${maxDistance} Miles`}</span>
          </div>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="forMembershipId">
            <Form.Label>Membership ID</Form.Label>
            <Form.Control name="membershipId" placeholder="Membership ID" {...bindMembershipId} />
          </Form.Group>
          <Form.Group as={Col} controlId="forMembershipExpiry">
            <Form.Label>Membership expiry date</Form.Label>
            <SingleDatePicker
              date={membershipExpiry}
              id="membershipExpiry"
              onDateChange={date => setMembershipExpiry(date)}
              focused={focused}
              onFocusChange={({ focused }) => setFocused(focused)}
              noBorder
              block
              openDirection="up"
              numberOfMonths={1}
              displayFormat="DD/MM/YYYY"
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" className="sign-in__button">
          Sign Up
        </Button>
        <Link to="/sign-in" className="sign-up__sign-in-link">
          Already got an account? Sign In
        </Link>
      </Form>
    </>
  );
}

InterpreterSignUp.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
