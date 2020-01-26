// Actions
const SAVE_SELECTED_DATES = 'SAVE_SELECTED_DATES';

export const saveSelectedDates = (startDate, endDate) => dispatch =>
  dispatch({
    type: SAVE_SELECTED_DATES,
    payload: {
      startDate,
      endDate,
    },
  });

// Reducer
const initialState = {
  startDate: null,
  endDate: null,
};

export function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SELECTED_DATES:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      return state;
  }
}
