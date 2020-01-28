import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const BookingItem = ({ first_name, last_name, hourly_rate }) => (
  <Card>
    <Card.Body>
      <Card.Title>{`${first_name} ${last_name}`}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{`£${hourly_rate}`}</Card.Subtitle>
      <Card.Text>Info goes here.</Card.Text>
      <Button variant="primary">Book</Button>
    </Card.Body>
  </Card>
);

BookingItem.propTypes = {
  available: PropTypes.bool,
  name: PropTypes.string,
  price: PropTypes.string,
};
