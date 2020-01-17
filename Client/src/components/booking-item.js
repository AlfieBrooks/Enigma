import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const BookingItem = ({ name, available, price }) => (
  <Card>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {available ? 'Available' : 'Not Available' || ''}
      </Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </Card.Text>
      <Button variant="primary">Book</Button>
    </Card.Body>
  </Card>
);
