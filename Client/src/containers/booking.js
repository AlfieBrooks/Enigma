import PropTypes from 'prop-types';
import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { BookingItem } from '../components/booking-item';
import { BookingSearch } from '../components/booking-search';
import { saveSelectedDates, getAvailableInterpreters } from '../redux/booking/booking-actions';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = () => {
    const { startDate, endDate } = this.props.booking;
    this.props.getAvailableInterpreters(startDate, endDate);
  };

  render() {
    return (
      <Container className="book__container">
        <h1> Book</h1>
        <BookingSearch saveSelectedDates={this.props.saveSelectedDates} />
        <Button onClick={this.submitHandler}>Search</Button>
        <ListGroup variant="flush">
          {this.props.booking.availableInterpreters.map(item => (
            <ListGroup.Item key={item.first_name}>
              <BookingItem first_name={item.first_name} last_name={item.last_name} hourly_rate={item.hourly_rate} />
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

export const BookingPage = connect(mapStateToProps, { saveSelectedDates, getAvailableInterpreters })(Booking);

Booking.propTypes = {
  saveSelectedDates: PropTypes.func.isRequired,
  getAvailableInterpreters: PropTypes.func.isRequired,
};
