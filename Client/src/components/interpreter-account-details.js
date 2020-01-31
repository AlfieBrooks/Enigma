import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { useInput } from '../utils/input-hook';

export function InterpreterAccountDetails({
  submitHandler,
  firstName,
  lastName,
  email,
  postcode,
  hourlyRate,
  maxDistance,
  membershipId,
  membershipExpiry,
}) {
  const { value: updatedFirstName, bind: bindFirstName } = useInput(firstName);
  const { value: updatedLastName, bind: bindLastName } = useInput(lastName);
  const { value: updatedPostcode, bind: bindPostcode } = useInput(postcode);
  const { value: updatedHourlyRate, bind: bindHourlyRate } = useInput(hourlyRate);
  const { value: updatedMaxDistance, bind: bindMaxDistance } = useInput(maxDistance);
  const { value: updatedMembershipId, bind: bindMembershipId } = useInput(membershipId);
  const [updatedMembershipExpiry, setMembershipExpiry] = useState(moment(membershipExpiry));
  const [focused, setFocused] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const userDetails = {
      accountType: ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER,
      updatedFirstName,
      updatedLastName,
      updatedPostcode,
      updatedHourlyRate,
      updatedMaxDistance,
      updatedMembershipId,
      updatedMembershipExpiry,
    };

    submitHandler(userDetails);
  };

  return (
    <>
      <h3>Update account details</h3>
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
          <Form.Control name="email" placeholder="Email address" value={email} readOnly plaintext />
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
              min="0"
              max="100"
              step="1"
              value={updatedMaxDistance}
              {...bindMaxDistance}
            />
            <span className="sign-in__slider-text">{`${updatedMaxDistance} Miles`}</span>
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
              date={updatedMembershipExpiry}
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
          Update
        </Button>
      </Form>
    </>
  );
}

InterpreterAccountDetails.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  hourlyRate: PropTypes.number,
  lastName: PropTypes.string,
  maxDistance: PropTypes.number,
  membershipExpiry: PropTypes.string,
  membershipId: PropTypes.string,
  postcode: PropTypes.string,
  submitHandler: PropTypes.func.isRequired,
};
