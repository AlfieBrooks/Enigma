import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { SignUp } from '../components/sign-up';
import { accountCompanySignUp, accountInterpreterSignUp } from '../redux/account/account-actions';

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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const SignUpPage = connect(mapStateToProps, { accountCompanySignUp, accountInterpreterSignUp })(SignUpContainer);

SignUpContainer.propTypes = {
  account: PropTypes.shape({
    authenticated: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  accountCompanySignUp: PropTypes.func,
  accountInterpreterSignUp: PropTypes.func,
};
