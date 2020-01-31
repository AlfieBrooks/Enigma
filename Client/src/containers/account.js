import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Container, Tab, Tabs, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CompanyAccountDetails } from '../components/company-account-details';
import { InterpreterAccountDetails } from '../components/interpreter-account-details';
import { updateCompanyAccount, updateInterpreterAccount } from '../redux/account/account-actions';
import { getBookingsForId, updateBooking } from '../redux/booking/booking-actions';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { BookingList } from '../components/booking-list';

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
          </Tab>
          <Tab eventKey={'Bookings'} title={'Bookings'}>
            {this.props.account.authenticated ? (
              <Fragment>
                <BookingList
                  bookings={this.props.bookings}
                  updateBooking={this.props.updateBooking}
                  getBookingsForId={this.props.getBookingsForId}
                  accountId={this.props.account.details._id}
                  account_type={this.props.account.details.account_type}
                />
              </Fragment>
            ) : (
              <Redirect to="/sign-in" />
            )}
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
