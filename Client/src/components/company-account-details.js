import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { useInput } from '../utils/input-hook';

export function CompanyAccountDetails({ submitHandler, companyName, email }) {
  const { value: updatedCompanyName, bind: bindCompanyName } = useInput(companyName);

  const handleSubmit = e => {
    e.preventDefault();
    const userDetails = {
      accountType: ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY,
      updatedCompanyName,
    };

    submitHandler(userDetails);
  };

  return (
    <>
      <h3>Update account details</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" placeholder="Email address" value={email} readOnly plaintext />
        </Form.Group>

        <Form.Group controlId="formCompanyName">
          <Form.Label>Company name</Form.Label>
          <Form.Control name="companyName" placeholder="Company name" {...bindCompanyName} />
        </Form.Group>

        <Button variant="primary" type="submit" className="sign-in__button">
          Update
        </Button>
      </Form>
    </>
  );
}

CompanyAccountDetails.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  companyName: PropTypes.string,
  email: PropTypes.string,
};
