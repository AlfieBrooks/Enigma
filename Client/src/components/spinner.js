import React from 'react';
import { Spinner } from 'react-bootstrap';

export const SpinnerPage = () => (
  <div class="d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);
