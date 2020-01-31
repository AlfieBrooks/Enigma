import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';

export class BookingList extends React.Component {
  componentDidMount() {
    this.props.getBookingsForId(this.props.accountId);
  }

  interpreterActions = bookingId => (
    <div className="card-right">
      <Button variant="danger" onClick={() => this.props.updateBooking({ action: 'declined', bookingId })}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <Button variant="success" onClick={() => this.props.updateBooking({ action: 'approved', bookingId })}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </div>
  );

  companyActions = bookingId => (
    <div className="card-right">
      <Button variant="danger" onClick={() => this.props.updateBooking({ action: 'deleted', bookingId })}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  );

  renderBookings = () => {
    const { bookings } = this.props;

    return (
      bookings &&
      bookings.map(item => {
        const startDate = moment(item.start_date).format('Do MMM YYYY');
        const endDate = moment(item.end_date).format('Do MMM YYYY');

        return (
          <ListGroup.Item key={item._id}>
            <Card>
              <Card.Body>
                <div className="card-left">
                  <Card.Subtitle className="mb-2 text-muted booking__status">{`Status: ${item.status}`}</Card.Subtitle>
                  {this.props.account_type === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY ? (
                    <Card.Title>{`Interpreter: ${item.interpreter_full_name}`}</Card.Title>
                  ) : (
                    <Card.Title>{`Company: ${item.company_name}`}</Card.Title>
                  )}
                  <Card.Subtitle className="mb-2 text-muted">{`${startDate} - ${endDate}`}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{`£${item.total_price}`}</Card.Subtitle>
                </div>
                {this.props.account_type == ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER
                  ? this.interpreterActions(item._id)
                  : this.companyActions(item._id)}
              </Card.Body>
            </Card>
          </ListGroup.Item>
        );
      })
    );
  };

  renderNoBookings = () => <h4 className="booking__no-bookings">No bookings have been made yet</h4>;

  render() {
    const { bookings } = this.props;

    return <ListGroup variant="flush">{bookings ? this.renderBookings() : this.renderNoBookings()}</ListGroup>;
  }
}

BookingList.propTypes = {
  bookings: PropTypes.array,
  updateBooking: PropTypes.func,
  getBookingsForId: PropTypes.func,
  accountId: PropTypes.string,
  account_type: PropTypes.string,
};
