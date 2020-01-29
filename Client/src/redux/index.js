import { combineReducers } from 'redux';

import { accountReducer as account } from './account/account-reducers';
import { bookingReducer as booking } from './booking/booking-reducers';

export const rootReducer = combineReducers({
  account,
  booking,
});
