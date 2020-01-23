import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';

export function DatePicker({ saveSelectedDates }) {
  const [startValue, setStartDate] = useState(null);
  const [endValue, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate && endDate) {
      saveSelectedDates(startDate, endDate);
    }
  };

  return (
    <DateRangePicker
      startDate={startValue}
      startDateId="bookingStartDate"
      endDate={endValue}
      endDateId="bookingEndDate"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={input => setFocusedInput(input)}
    />
  );
}

DatePicker.propTypes = {
  saveSelectedDates: PropTypes.func,
};
