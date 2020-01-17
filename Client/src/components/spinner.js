import React from 'react';
import { Spinner } from 'react-bootstrap';

export const SpinnerPage = () => (
  <div className="d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);
