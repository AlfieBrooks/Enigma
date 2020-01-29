import {
  SAVE_SELECTED_DATES,
  FETCH_AVAILABLE_INTERPRETERS_STARTED,
  FETCH_AVAILABLE_INTERPRETERS_SUCCESS,
  FETCH_AVAILABLE_INTERPRETERS_FAILED,
  BOOKING_REQUEST_STARTED,
  BOOKING_REQUEST_SUCCESS,
  BOOKING_REQUEST_FAILED,
} from './booking-action-constants';

// Action Creators
const fetchAvailableInterpretersStarted = () => ({ type: FETCH_AVAILABLE_INTERPRETERS_STARTED });
const fetchAvailableInterpretersSuccess = availableInterpreters => ({ type: FETCH_AVAILABLE_INTERPRETERS_SUCCESS, availableInterpreters });
const fetchAvailableInterpretersFailed = error => ({ type: FETCH_AVAILABLE_INTERPRETERS_FAILED, error });
const bookingRequestStarted = () => ({ type: BOOKING_REQUEST_STARTED });
const bookingRequestSuccess = booking => ({ type: BOOKING_REQUEST_SUCCESS, booking });
const bookingRequestFailed = error => ({ type: BOOKING_REQUEST_FAILED, error });

// Thunk
export const saveSelectedDates = (startDate, endDate) => dispatch =>
  dispatch({
    type: SAVE_SELECTED_DATES,
    payload: {
      startDate,
      endDate,
    },
  });

export const getAvailableInterpreters = (startDate, endDate) => {
  return dispatch => {
    dispatch(fetchAvailableInterpretersStarted());
    fetch('http://localhost:443/availability', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        start_date: startDate,
        end_date: endDate,
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(fetchAvailableInterpretersFailed(result.error));
        }
        return dispatch(fetchAvailableInterpretersSuccess(result));
      })
      .catch(e => {
        return dispatch(fetchAvailableInterpretersFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`));
      });
  };
};

export const bookingRequest = (startDate, endDate, totalPrice, companyName, companyId, interpreterFullName, interpreterId) => {
  return dispatch => {
    dispatch(bookingRequestStarted());
    fetch('http://localhost:443/booking-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        company_name: companyName,
        company_id: companyId,
        interpreter_full_name: interpreterFullName,
        interpreter_id: interpreterId,
      }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(bookingRequestFailed(result.error));
        }
        return dispatch(bookingRequestSuccess(result));
      })
      .catch(e => {
        return dispatch(bookingRequestFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`));
      });
  };
};