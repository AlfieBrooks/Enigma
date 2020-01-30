import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Container, ListGroup, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';

import { BookingItem } from '../components/booking-item';
import { BookingSearch } from '../components/booking-search';
import { bookingRequest, getAvailableInterpreters, saveSelectedDates, clearBookingError } from '../redux/booking/booking-actions';
import { ErrorToast } from '../components/error-toast';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };
  }

  submitHandler = () => {
    const { startDate, endDate } = this.props.booking;
    this.props.getAvailableInterpreters(startDate, endDate);
  };

  makeBooking = ({ hourlyRate, interpreterFirstName, interpreterLastName, interpreterId }) => {
    const { _id: companyId, company_name: companyName } = this.props.account.details;
    const { startDate, endDate } = this.props.booking;
    const interpreterFullName = `${interpreterFirstName} ${interpreterLastName}`;
    const totalPrice = hourlyRate * 4;
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


  onToastClose = () => {
    this.props.clearBookingError();
  }

  render() {
    return (
      <Container className="book__container">
        <h1>Book</h1>
        <BookingSearch saveSelectedDates={this.props.saveSelectedDates} />
        <Button onClick={this.submitHandler}>Search</Button>
        <ListGroup variant="flush">
          {this.props.booking.availableInterpreters.map(item => (
            <ListGroup.Item key={item._id}>
              <BookingItem
                firstName={item.first_name}
                lastName={item.last_name}
                hourlyRate={item.hourly_rate}
                interpreterId={item._id}
                makeBooking={this.makeBooking}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ErrorToast 
          showError={this.props.booking.error}
          errorMessage={this.props.booking.error} 
          onToastClose={this.onToastClose}
          />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
  booking: state.booking,
});

export const BookingPage = connect(mapStateToProps, {
  saveSelectedDates,
  getAvailableInterpreters,
  bookingRequest,
  clearBookingError
})(Booking);

Booking.propTypes = {
  bookingRequest: PropTypes.func.isRequired,
  getAvailableInterpreters: PropTypes.func.isRequired,
  saveSelectedDates: PropTypes.func.isRequired,
  clearBookingError: PropTypes.func.isRequired,

};
