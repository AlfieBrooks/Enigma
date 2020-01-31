import { ListGroup, Card, Button } from 'react-bootstrap';
import React, { Fragment } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';

export class BookingList extends React.Component {
  componentDidMount() {
    this.props.getBookingsForId(this.props.accountId);
  }

  actions = bookingId => {
    return (
      <div className="card-right">
        <Button variant="danger" onClick={() => this.props.updateBooking({ action: 'declined', bookingId })}><FontAwesomeIcon icon={faTimes} /></Button>
        <Button variant="success" onClick={() => this.props.updateBooking({ action: 'approved', bookingId })}><FontAwesomeIcon icon={faCheck} /></Button>
      </div>
    );
  };

  renderBookings = () => {
    const { bookings } = this.props;

    bookings.map(item => {
      const startDate = moment(item.start_date).format('Do MMM YYYY');;
      const endDate = moment(item.end_date).format('Do MMM YYYY');;

      return (
        <ListGroup.Item key={item._id}>
          <Card>
            <Card.Body>
              <div className="card-left">
                <Card.Subtitle className="mb-2 text-muted booking__status">{`Status: ${item.status}`}</Card.Subtitle>
                { this.props.account_type === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY ? (
                  <Card.Title>{`Interpreter: ${item.interpreter_full_name}`}</Card.Title>
                ) : (
                  <Card.Title>{`Company: ${item.company_name}`}</Card.Title>
                )}
                <Card.Subtitle className="mb-2 text-muted">{`${startDate} - ${endDate} `}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{`£${item.total_price}`}</Card.Subtitle>
              </div>
              { this.props.account_type == ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER && this.actions(item._id) }
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
    });
  };

  renderNoBookings = () => (
    <h4 className="booking__no-bookings">No bookings have been made yet</h4>
  );

  render() {
    const { bookings } = this.props;

    return (
      <ListGroup variant="flush">
        { bookings && bookings.length > 0 ? this.renderBookings() : this.renderNoBookings() }
      </ListGroup>
    );
  }
}
