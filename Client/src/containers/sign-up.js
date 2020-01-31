import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { ErrorToast } from '../components/error-toast';
import { SignUp } from '../components/sign-up';
import { accountCompanySignUp, accountInterpreterSignUp, clearAccountError } from '../redux/account/account-actions';

export class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="sign-up__container">
        <SignUp
          account={this.props.account}
          accountCompanySignUp={this.props.accountCompanySignUp}
          accountInterpreterSignUp={this.props.accountInterpreterSignUp}
        />
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

export const SignUpPage = connect(mapStateToProps, {
  accountCompanySignUp,
  accountInterpreterSignUp,
  clearAccountError,
})(SignUpContainer);

SignUpContainer.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string,
    error: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }),
  accountCompanySignUp: PropTypes.func,
  accountInterpreterSignUp: PropTypes.func,
  clearAccountError: PropTypes.func,
};
