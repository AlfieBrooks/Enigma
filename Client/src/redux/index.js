import { combineReducers } from 'redux';

import { accountReducer as account } from './account';
import { bookingReducer as booking } from './booking';

export const rootReducer = combineReducers({
  account,
  booking,
});
