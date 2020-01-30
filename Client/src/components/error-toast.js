import PropTypes from 'prop-types';
import React from 'react'
import { Toast } from 'react-bootstrap';

export const ErrorToast = ({ showError, errorMessage, onToastClose }) => (
  <Toast show={showError} onClose={() => onToastClose()} delay={3000}>
    <Toast.Header>
      <strong>Oops.. Error Occured!</strong>
    </Toast.Header>
    <Toast.Body>
      Sorry an error has occured : {errorMessage}
    </Toast.Body>
  </Toast>
);

ErrorToast.propTypes = {
  showError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onToastClose: PropTypes.func.isRequired,
};