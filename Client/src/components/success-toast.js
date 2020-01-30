import PropTypes from 'prop-types';
import React from 'react'
import { Toast } from 'react-bootstrap';

export const SuccessToast = ({ showToast, successMessage, onToastClose }) => (
  <Toast show={showToast} onClose={() => onToastClose()} delay={3000}>
    <Toast.Header>
      <strong class="mr-auto" >Yay! Success</strong>
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