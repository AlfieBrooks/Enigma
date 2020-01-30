import PropTypes from 'prop-types';
import React from 'react'
import { Toast } from 'react-bootstrap';

export const ErrorToast = ({ showToast, errorMessage, onToastClose }) => (
  <Toast show={showToast} onClose={() => onToastClose()} delay={3000}>
    <Toast.Header>
      <strong class="mr-auto" >Oops..</strong>
    </Toast.Header>
    <Toast.Body>
      Sorry an error has occured: {errorMessage}
    </Toast.Body>
  </Toast>
);

ErrorToast.propTypes = {
  showToast: PropTypes.bool,
  errorMessage: PropTypes.string,
  onToastClose: PropTypes.func.isRequired,
};