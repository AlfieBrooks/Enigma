import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CompanyAccountDetails } from '../components/company-account-details';
import { ErrorToast } from '../components/error-toast';
import { InterpreterAccountDetails } from '../components/interpreter-account-details';
import { SuccessToast } from '../components/success-toast';
import {
  clearAccountError,
  clearAccountHasUpdated,
  updateCompanyAccount,
  updateInterpreterAccount,
} from '../redux/account/account-actions';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';

export class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    if (this.props.account.hasUpdated) {
      this.props.clearAccountHasUpdated();
    }
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

    return <CompanyAccountDetails submitHandler={this.submitHandler} email={email} companyName={company_name} />;
  };

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
  };

  render() {
    return (
      <Container className="sign-in__container">
        {this.props.account.details.account_type === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY
          ? this.renderCompanyAccountDetails()
          : this.renderInterpreterAccountDetails()}
        <ErrorToast
          showToast={Boolean(this.props.account.error)}
          errorMessage={this.props.account.error}
          onToastClose={this.props.clearAccountError}
        />
        <SuccessToast
          showToast={this.props.account.hasUpdated}
          successMessage="Successfully updated your details!"
          onToastClose={this.props.clearAccountHasUpdated}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export const AccountPage = connect(mapStateToProps, {
  updateCompanyAccount,
  updateInterpreterAccount,
  clearAccountError,
  clearAccountHasUpdated,
})(AccountContainer);

AccountContainer.propTypes = {
  account: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    details: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
  updateCompanyAccount: PropTypes.func.isRequired,
  updateInterpreterAccount: PropTypes.func.isRequired,
  clearAccountError: PropTypes.func.isRequired,
  clearAccountHasUpdated: PropTypes.func.isRequired,
};
