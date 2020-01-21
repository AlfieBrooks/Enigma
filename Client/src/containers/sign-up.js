import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { accountSignUp } from '../redux/account';
import { SignUp } from '../components/sign-up';

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
