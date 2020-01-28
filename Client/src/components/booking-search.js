import PropTypes from 'prop-types';
import React from 'react';

import { DateRangeSelector } from './date-range-selector';

export const BookingSearch = ({ saveSelectedDates }) => <DateRangeSelector saveSelectedDates={saveSelectedDates} />;

BookingSearch.propTypes = {
  saveSelectedDates: PropTypes.func,
};
