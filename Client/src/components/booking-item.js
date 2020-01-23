import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const BookingItem = ({ name, available, price }) => (
  <Card>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{available ? 'Available' : 'Not Available' || ''}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
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
