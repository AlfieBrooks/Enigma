import PropTypes from 'prop-types';
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
    const { firstName, lastName, email } = this.props.account;
    return (
      <Container className="sign-in__container">
        {this.props.account.authenticated ? (
          <Account firstName={firstName} lastName={lastName} email={email} />
        ) : (
          <Redirect to="/sign-in" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const AccountPage = connect(mapStateToProps)(AccountContainer);

AccountContainer.propTypes = {
  account: PropTypes.shape({
    authenticated: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};
