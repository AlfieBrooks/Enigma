import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const BookingItem = ({ firstName, lastName, hourlyRate, interpreterId, makeBooking }) => {
  const submitHandler = event => {
    event.preventDefault();
    const userDetails = {
      firstName,
      lastName,
      hourlyRate,
      interpreterId,
    };
    makeBooking(userDetails);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{`£${hourlyRate}`}</Card.Subtitle>
        <Card.Text>Info goes here.</Card.Text>
        <Button variant="primary" onClick={submitHandler}>
          Book
        </Button>
      </Card.Body>
    </Card>
  );
};

BookingItem.propTypes = {
  firstName: PropTypes.string,
  hourlyRate: PropTypes.number,
  interpreterId: PropTypes.string,
  lastName: PropTypes.string,
  makeBooking: PropTypes.func.isRequired,
};
