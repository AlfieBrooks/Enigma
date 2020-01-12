import React from 'react';

import { SignInComponent } from './sign-in';
import { connect } from 'react-redux';

import { MODAL_TYPES } from '../redux/modal';

const modalMap = {
  [MODAL_TYPES.SIGN_IN]: SignInComponent,
};

export class Modal extends React.Component {
  render() {
    const Modal = modalMap[this.props.modal.type];

    if (!Modal) {
      return null;
    }
    return <Modal {...this.props} />;
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
});

export const ModalFactory = connect(mapStateToProps)(Modal);
