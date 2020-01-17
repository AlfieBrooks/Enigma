import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export function DatePicker({ saveSelectedDates }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
      startDate={startDate}
      startDateId="bookingStartDate"
      endDate={endDate}
      endDateId="bookingEndDate"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
    />
  );
}
