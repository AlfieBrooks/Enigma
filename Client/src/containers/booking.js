import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { saveSelectedDates } from '../redux/booking';
import { BookingSearch } from '../components/booking-search';
import { BookingItem } from '../components/booking-item';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // TODO: Get from database when setup
    const mock = [
      {
        name: 'Dave',
        price: '£100',
        image: 'Image',
        available: true,
      },
      {
        name: 'Jim',
        price: '£140',
        image: 'Image1',
        available: true,
      },
      {
        name: 'Alfus',
        price: '£1103',
        image: 'Image2',
        available: false,
      },
    ];

    return (
      <Container className="book__container">
        <h1> Book</h1>
        <BookingSearch saveSelectedDates={this.props.saveSelectedDates} />
        <ListGroup variant="flush">
          {mock.map(item => (
            <ListGroup.Item key={item.name}>
              <BookingItem
                name={item.name}
                price={item.price}
                image={item.image}
                available={item.available}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  booking: state.booking,
});

export const BookingPage = connect(mapStateToProps, { saveSelectedDates })(Booking);
