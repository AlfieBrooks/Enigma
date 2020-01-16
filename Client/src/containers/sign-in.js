import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { SignIn } from '../components/sign-in';
import { accountSignIn } from '../redux/account';

export class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="home__container">
        <SignIn 
          account={this.props.account}
          accountSignIn={this.props.accountSignIn} 
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const SignInPage = connect(mapStateToProps, { accountSignIn })(SignInContainer);
