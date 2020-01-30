import PropTypes from 'prop-types';
import React from 'react';
import { Button, Container, ListGroup, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import { BookingItem } from '../components/booking-item';
import { BookingSearch } from '../components/booking-search';
import { bookingRequest, getAvailableInterpreters, saveSelectedDates, clearBookingError } from '../redux/booking/booking-actions';
import { ErrorToast } from '../components/error-toast';
import { SuccessToast } from '../components/success-toast';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = () => {
    const { startDate, endDate } = this.props;
    this.props.getAvailableInterpreters(startDate, endDate);
  };

  makeBooking = ({ hourlyRate, firstName, lastName, interpreterId }) => {
    const { _id: companyId, company_name: companyName } = this.props.accountDetails;
    const { startDate, endDate } = this.props;
    const interpreterFullName = `${firstName} ${lastName}`;
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

  getBookingSuccessMessage = () => {
    if (this.props.booking) {
      const { 
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        interpreter_full_name: interpreterName
      } = this.props.booking;
      const formattedStartDate = moment(startDate).format('DD/MM');
      const formattedEndDate = moment(endDate).format('DD/MM');

      return this.props.booking ?`You just booked ${interpreterName} from ${formattedStartDate} till ${formattedEndDate}. Total Price: £${totalPrice}`;
    }
    return '';
  }

  render() {
    return (
      <Container className="book__container">
        <h1>Book</h1>
        <BookingSearch saveSelectedDates={this.props.saveSelectedDates} />
        <Button onClick={this.submitHandler}>Search</Button>
        <ListGroup variant="flush">
          {this.props.availableInterpreters.map(item => (
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
          showToast={Boolean(this.props.bookingError)}
          errorMessage={this.props.bookingError} 
          onToastClose={this.props.clearBookingError()}
        />
        <SuccessToast 
          showToast={Boolean(this.props.booking)}
          successMessage={this.getBookingSuccessMessage()}
          onToastClose={'yolo'}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ account, booking}) => ({
  accountDetails: account.details,
  availableInterpreters: booking.availableInterpreters,
  booking: booking.booking,
  bookingError: booking.error,
  endDate: booking.endDate,
  startDate: booking.startDate,
});

export const BookingPage = connect(mapStateToProps, {
  saveSelectedDates,
  getAvailableInterpreters,
  bookingRequest,
  clearBookingError,
})(Booking);

Booking.propTypes = {
  accountDetails: PropTypes.object,
  availableInterpreters: PropTypes.array,
  booking: PropTypes.object,
  bookingError: PropTypes.string,
  bookingRequest: PropTypes.func.isRequired,
  clearBookingError: PropTypes.func.isRequired,
  getAvailableInterpreters: PropTypes.func.isRequired,
  saveSelectedDates: PropTypes.func.isRequired,
  endDate: PropTypes.object,
  startDate: PropTypes.object,
};
