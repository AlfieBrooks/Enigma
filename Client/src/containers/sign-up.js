import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { SignUp } from '../components/sign-up';

export class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="sign-up__container">
        <SignUp />
      </Container>
    );
  }
}

export const SignUpPage = connect()(SignUpContainer);
