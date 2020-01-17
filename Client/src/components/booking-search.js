import React from 'react';

import { DatePicker } from './date-picker';

export const BookingSearch = ({ saveSelectedDates }) => (
  <DatePicker saveSelectedDates={saveSelectedDates} />
);
