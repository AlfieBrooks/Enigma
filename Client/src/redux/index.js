import { combineReducers } from 'redux';

import account from './account';
import booking from './booking';

const rootReducer = combineReducers({
  account,
  booking,
});

export default rootReducer;
