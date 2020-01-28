import {
  SAVE_SELECTED_DATES,
  FETCH_AVAILABLE_INTERPRETERS_STARTED,
  FETCH_AVAILABLE_INTERPRETERS_SUCCESS,
  FETCH_AVAILABLE_INTERPRETERS_FAILED,
} from './booking-action-constants';

// Action Creators
const fetchAvailableInterpretersStarted = () => ({ type: FETCH_AVAILABLE_INTERPRETERS_STARTED });
const fetchAvailableInterpretersSuccess = availableInterpreters => ({ type: FETCH_AVAILABLE_INTERPRETERS_SUCCESS, availableInterpreters });
const fetchAvailableInterpretersFailed = () => ({ type: FETCH_AVAILABLE_INTERPRETERS_FAILED });

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
