import { ListGroup, Card } from 'react-bootstrap';
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ACCOUNT_TYPES } from '../utils/account-type-constants';

const formatDate = date => date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

export class BookingList extends React.Component {
  componentDidMount() {
    this.props.getBookingsForId(this.props.accountId);
  }

  actions = bookingId => {
    return (
      <Fragment>
        <FontAwesomeIcon icon={faTimes} onClick={() => this.props.updateBooking({ action: 'declined', bookingId })} />
        <FontAwesomeIcon icon={faCheck} onClick={() => this.props.updateBooking({ action: 'approved', bookingId })} />
      </Fragment>
    );
  };

  render() {
    const { bookings } = this.props;
    return (
      <ListGroup variant="flush">
        {bookings &&
          bookings.map(item => {
            const startDate = new Date(item.start_date);
            const endDate = new Date(item.end_date);

            return (
              <ListGroup.Item key={item._id}>
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{`Status: ${item.status}`}</Card.Subtitle>
                    {this.props.account_type === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY ? (
                      <Card.Title>{`Interpreter: ${item.interpreter_full_name}`}</Card.Title>
                    ) : (
                      <Card.Title>{`Company: ${item.company_name}`}</Card.Title>
                    )}
                    <Card.Subtitle className="mb-2 text-muted">{`${formatDate(startDate)} - ${formatDate(
                      endDate
                    )} `}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{`£${item.total_price}`}</Card.Subtitle>
                  </Card.Body>
                </Card>
                {this.props.account_type == ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER && this.actions(item._id)}
              </ListGroup.Item>
            );
          })}
        ;
      </ListGroup>
    );
  }
}
