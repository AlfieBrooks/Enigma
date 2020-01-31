import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { BookingItem } from '../components/booking-item';
import { BookingSearch } from '../components/booking-search';
import { ErrorToast } from '../components/error-toast';
import { SpinnerPage } from '../components/spinner';
import { SuccessToast } from '../components/success-toast';
import {
  bookingRequest,
  clearBookingError,
  clearBookingSuccess,
  getAvailableInterpreters,
  saveSelectedDates,
} from '../redux/booking/booking-actions';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = () => {
    const { startDate, endDate } = this.props;
    this.props.getAvailableInterpreters(startDate, endDate);
  };

  getTotalPrice = hourlyRate => {
    const HOURS_PER_DAY = 2;

    const { startDate, endDate } = this.props;
    const start = moment(startDate);
    const end = moment(endDate);
    const numberOfDays = Math.abs(start.diff(end, 'days')) + 1;
    const dayRate = hourlyRate * HOURS_PER_DAY;
    const totalPrice = dayRate * numberOfDays;

    return totalPrice;
  };

  makeBooking = ({ hourlyRate, firstName, lastName, interpreterId }) => {
    const { _id: companyId, company_name: companyName } = this.props.accountDetails;
    const { startDate, endDate } = this.props;
    const interpreterFullName = `${firstName} ${lastName}`;
    const totalPrice = this.getTotalPrice(hourlyRate);
    const bookingDetails = {
      startDate,
      endDate,
      totalPrice,
      companyName,
      companyId,
      interpreterFullName,
      interpreterId,
    };

    this.props.bookingRequest(bookingDetails);
  };

  getBookingSuccessMessage = () => {
    if (this.props.booking) {
      const {
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        interpreter_full_name: interpreterName,
      } = this.props.booking;
      const formattedStartDate = moment(startDate).format('Do MMMM');
      const formattedEndDate = moment(endDate).format('Do MMMM');

      return `You just booked ${interpreterName} from ${formattedStartDate} till ${formattedEndDate}. Total Price: £${totalPrice}`;
    }
    return '';
  };

  renderAvilableInterpreters = () => {
    if (this.props.loading) {
      return <SpinnerPage />;
    }

    const { availableInterpreters } = this.props;
    if (!Array.isArray(availableInterpreters)) {
      return <h4 className="book__info-text">Enter the dates to start your search</h4>;
    }

    if (!availableInterpreters.length) {
      const { startDate, endDate } = this.props;
      const formattedStartDate = moment(startDate).format('Do MMM');
      const formattedEndDate = moment(endDate).format('Do MMM');
      return (
        <h4 className="book__info-text">{`Sorry, No interpreters are available on ${formattedStartDate} - ${formattedEndDate}`}</h4>
      );
    }

    return this.props.availableInterpreters.map(item => (
      <ListGroup.Item key={item._id}>
        <BookingItem
          firstName={item.first_name}
          lastName={item.last_name}
          hourlyRate={item.hourly_rate}
          interpreterId={item._id}
          makeBooking={this.makeBooking}
        />
      </ListGroup.Item>
    ));
  };

  render() {
    return (
      <Container className="book__container">
        <h1 className="book__title">Book</h1>
        <BookingSearch saveSelectedDates={this.props.saveSelectedDates} submitHandler={this.submitHandler} />
        <ListGroup variant="flush">{this.renderAvilableInterpreters()}</ListGroup>
        <ErrorToast
          showToast={Boolean(this.props.bookingError)}
          errorMessage={this.props.bookingError}
          onToastClose={this.props.clearBookingError}
        />
        <SuccessToast
          showToast={Boolean(this.props.booking)}
          successMessage={this.getBookingSuccessMessage()}
          onToastClose={this.props.clearBookingSuccess}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ account, booking }) => ({
  accountDetails: account.details,
  availableInterpreters: booking.availableInterpreters,
  booking: booking.booking,
  bookingError: booking.error,
  endDate: booking.endDate,
  startDate: booking.startDate,
  loading: booking.loading,
});

export const BookingPage = connect(mapStateToProps, {
  saveSelectedDates,
  getAvailableInterpreters,
  bookingRequest,
  clearBookingError,
  clearBookingSuccess,
})(Booking);

Booking.propTypes = {
  accountDetails: PropTypes.object,
  availableInterpreters: PropTypes.array,
  booking: PropTypes.object,
  bookingError: PropTypes.string,
  bookingRequest: PropTypes.func.isRequired,
  clearBookingError: PropTypes.func.isRequired,
  clearBookingSuccess: PropTypes.func.isRequired,
  endDate: PropTypes.object,
  getAvailableInterpreters: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  saveSelectedDates: PropTypes.func.isRequired,
  startDate: PropTypes.object,
};
