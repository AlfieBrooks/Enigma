import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

import { DateRangeSelector } from './date-range-selector';

export const BookingSearch = ({ saveSelectedDates, submitHandler }) => (
  <div className="booking-search__container">
    <DateRangeSelector saveSelectedDates={saveSelectedDates} />
    <Button onClick={submitHandler} size="lg">
      Search
    </Button>
  </div>
);

BookingSearch.propTypes = {
  saveSelectedDates: PropTypes.func,
  submitHandler: PropTypes.func.isRequired,
};
