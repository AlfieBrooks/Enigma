import PropTypes from 'prop-types';
import React from 'react';

import { DatePicker } from './date-picker';

export const BookingSearch = ({ saveSelectedDates }) => <DatePicker saveSelectedDates={saveSelectedDates} />;

BookingSearch.propTypes = {
  saveSelectedDates: PropTypes.func,
};
