import React from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useInput } from '../utils/input-hook';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';

export function CompanySignUp({ submitHandler }) {
  const { bind: bindCompanyName } = useInput();
  const { bind: bindEmail } = useInput();
  const { bind: bindPassword } = useInput();
  const { bind: bindConfirmPassword } = useInput();

  const handleSubmit = e => {
    e.preventDefault();
    submitHandler(ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY)
  }

  return (
    <>
    <h3>Sign up - Company</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCompanyName">
        <Form.Label>Company name</Form.Label>
        <Form.Control name="companyName" placeholder="Company name" {...bindCompanyName} />
      </Form.Group>

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

      <Button variant="primary" type="submit" className="sign-in__button">Sign Up</Button>
      <Link to="/sign-in" className="sign-up__sign-in-link">Already got an account? Sign In</Link>
    </Form>
  </>
  );
}
