import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Account } from '../components/account';

export class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="sign-in__container">
        {this.props.account.authenticated ? <Account account={this.props.account} /> : <Redirect to="/sign-in" />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const AccountPage = connect(mapStateToProps)(AccountContainer);
