import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CompanyAccountDetails } from '../components/company-account-details';
import { InterpreterAccountDetails } from '../components/interpreter-account-details';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { updateCompanyAccount, updateInterpreterAccount } from '../redux/account/account-actions';

export class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = userDetails => {
    const { _id } = this.props.account.details;
    const modifiedUserDetails = { ...userDetails, _id };

    this.props.account.details.account_type === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY
      ? this.props.updateCompanyAccount(modifiedUserDetails)
      : this.props.updateInterpreterAccount(modifiedUserDetails);
  };

  renderCompanyAccountDetails = () => {
    const { email, company_name } = this.props.account.details;

    return (
      <CompanyAccountDetails
        submitHandler={this.submitHandler}
        email={email}
        companyName={company_name}
      />
    );
  }

  renderInterpreterAccountDetails = () => {
    const {
      email,
      first_name,
      last_name,
      postcode,
      hourly_rate,
      max_distance,
      membership_id,
      membership_expiry,
    } = this.props.account.details;

    return (
      <InterpreterAccountDetails
        submitHandler={this.submitHandler}
        email={email}
        firstName={first_name}
        lastName={last_name}
        postcode={postcode}
        hourlyRate={hourly_rate}
        maxDistance={max_distance}
        membershipId={membership_id}
        membershipExpiry={membership_expiry}
      />
    );
  }

  render() {
    return (
      <Container className="sign-in__container">
        {this.props.account.details.account_type === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY ?
          this.renderCompanyAccountDetails() : this.renderInterpreterAccountDetails()
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const AccountPage = connect(mapStateToProps, {
  updateCompanyAccount,
  updateInterpreterAccount
})(AccountContainer);

AccountContainer.propTypes = {
  account: PropTypes.shape({
    authenticated: PropTypes.bool,
    details: PropTypes.shape({
        email: PropTypes.string,
    }),
  }),
  updateCompanyAccount: PropTypes.func.isRequired,
  updateInterpreterAccount: PropTypes.func.isRequired,
};
