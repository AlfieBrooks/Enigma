import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { SignUp } from '../components/sign-up';
import { accountSignUp } from '../redux/account';

export class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="sign-up__container">
        <SignUp account={this.props.account} accountSignUp={this.props.accountSignUp} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const SignUpPage = connect(mapStateToProps, { accountSignUp })(SignUpContainer);

SignUpContainer.propTypes = {
  account: PropTypes.shape({
    authenticated: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  accountSignUp: PropTypes.func,
};
