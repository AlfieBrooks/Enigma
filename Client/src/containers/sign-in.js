import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { SignIn } from '../components/sign-in';
import { accountSignIn, clearAccountError } from '../redux/account/account-actions';
import { ErrorToast } from '../components/error-toast'

export class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="sign-in__container">
        <SignIn account={this.props.account} accountSignIn={this.props.accountSignIn} />
        <ErrorToast 
          showToast={Boolean(this.props.account.error)}
          errorMessage={this.props.account.error} 
          onToastClose={this.props.clearAccountError}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const SignInPage = connect(mapStateToProps, { accountSignIn, clearAccountError })(SignInContainer);

SignInContainer.propTypes = {
  account: PropTypes.object,
  accountSignIn: PropTypes.func.isRequired,
  clearAccountError: PropTypes.func.isRequired
};
