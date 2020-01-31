import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Container, Tab, Tabs, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CompanyAccountDetails } from '../components/company-account-details';
import { ErrorToast } from '../components/error-toast';
import { InterpreterAccountDetails } from '../components/interpreter-account-details';
import { SuccessToast } from '../components/success-toast';
import { getBookingsForId, updateBooking } from '../redux/booking/booking-actions';
import {
  updateCompanyAccount,
  updateInterpreterAccount,
  clearAccountError,
  clearAccountHasUpdated,
} from '../redux/account/account-actions';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { BookingList } from '../components/booking-list';

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

  renderTabs = () => (
    <Row className="justify-content-md-center">
      <Col md="9" className="sign-in__column">
        <Tabs defaultActiveKey={'Account'} id="uncontrolled-tab-example">
          <Tab eventKey={'Account'} title={'Account'}>
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
          </Tab>
          <Tab eventKey={'Bookings'} title={'Bookings'}>
            <BookingList
              bookings={this.props.bookings}
              updateBooking={this.props.updateBooking}
              getBookingsForId={this.props.getBookingsForId}
              accountId={this.props.account.details._id}
              account_type={this.props.account.details.account_type}
            />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );

  render() {
    return <Container className="sign-in__container">{this.renderTabs()}</Container>;
  }
}

const mapStateToProps = state => ({
  account: state.account,
  bookings: state.booking.bookings,
});

export const AccountPage = connect(mapStateToProps, {
  updateCompanyAccount,
  updateInterpreterAccount,
  getBookingsForId,
  updateBooking,
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
