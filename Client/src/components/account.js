import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export const Account = ({ firstName, lastName, email }) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          defaultValue={firstName}
          placeholder="First Name"
          aria-label="First Name"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          defaultValue={lastName}
          placeholder="Last Name"
          aria-label="Last Name"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          readOnly
          defaultValue={email && email.split('@')[0]}
          placeholder="Email Adress"
          aria-label="Email Adress"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2">@{email ? email.split('@')[1] : 'example.com'}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>

      {/* <label htmlFor="basic-url">Your vanity URL</label>
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon3">https://example.com/users/</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl id="basic-url" aria-describedby="basic-addon3" />
    </InputGroup>

    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl aria-label="Amount (to the nearest dollar)" />
      <InputGroup.Append>
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>

    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>With textarea</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl as="textarea" aria-label="With textarea" />
    </InputGroup> */}
      <br />
      <Button variant="outline-success">Update your details</Button>
    </div>
  );
};

Account.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};
