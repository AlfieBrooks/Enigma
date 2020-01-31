import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { useInput } from '../utils/input-hook';
import md5 from 'md5';

export function CompanySignUp({ submitHandler }) {
  const { value: companyName, bind: bindCompanyName } = useInput();
  const { value: email, bind: bindEmail } = useInput();
  const { value: password, bind: bindPassword } = useInput();
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput();

  const handleSubmit = e => {
    e.preventDefault();
    const userDetails = {
      accountType: ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY,
      companyName,
      email,
      password: md5(password),
      confirmPassword: md5(password),
    };

    submitHandler(userDetails);
  };

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
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...bindConfirmPassword}
          />
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
}

CompanySignUp.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
