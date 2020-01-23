import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { bookingReducer } from './booking';

export const rootReducer = combineReducers({
  account: accountReducer,
  booking: bookingReducer,
});
