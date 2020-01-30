import PropTypes from 'prop-types';
import React from 'react'
import { Toast } from 'react-bootstrap';

export const SuccessToast = ({ showToast, successMessage, onToastClose }) => (
  <Toast show={showToast} onClose={() => onToastClose()} animation={false}>
    <Toast.Header>
      <strong className="mr-auto" >Yay! Success!</strong>
    </Toast.Header>
    <Toast.Body>
      It worked! - {successMessage}
    </Toast.Body>
  </Toast>
);

SuccessToast.propTypes = {
  showToast: PropTypes.bool,
  successMessage: PropTypes.string,
  onToastClose: PropTypes.func.isRequired,
};