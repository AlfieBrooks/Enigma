import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Container, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { BookingItem } from '../components/booking-item';
import { BookingSearch } from '../components/booking-search';
import { bookingRequest, getAvailableInterpreters, saveSelectedDates } from '../redux/booking/booking-actions';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = () => {
    const { startDate, endDate } = this.props.booking;
    this.props.getAvailableInterpreters(startDate, endDate);
  };

  makeBooking = (hourlyRate, interpreterFirstName, interpreterLastName, interpreterId) => {
    const { _id: companyId, company_name: companyName } = this.props.account.details;
    const { startDate, endDate } = this.props.booking;
    const interpreterFullName = `${interpreterFirstName} ${interpreterLastName}`;
    const totalPrice = hourlyRate * 4;

    this.props.bookingRequest(
      startDate,
      endDate,
      totalPrice,
      companyName,
      companyId,
      interpreterFullName,
      interpreterId
    );
  };

  renderError = () => (
    <Alert variant="danger" dismissible>
      <Alert.Heading>Oops!</Alert.Heading>
      <span>{this.props.booking.error}</span>
    </Alert>
  );

  render() {
    return (
      <Container className="book__container">
        {this.props.booking.error && this.renderError()}
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
})(Booking);

Booking.propTypes = {
  bookingRequest: PropTypes.func.isRequired,
  getAvailableInterpreters: PropTypes.func.isRequired,
  saveSelectedDates: PropTypes.func.isRequired,
};
