import {
  SAVE_SELECTED_DATES,
  FETCH_AVAILABLE_INTERPRETERS_STARTED,
  FETCH_AVAILABLE_INTERPRETERS_SUCCESS,
  FETCH_AVAILABLE_INTERPRETERS_FAILED,
} from './booking-action-constants';

const initialState = {
  loading: false,
  error: null,
  availableInterpreters: [],
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
    case FETCH_AVAILABLE_INTERPRETERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_AVAILABLE_INTERPRETERS_SUCCESS:
      return {
        ...state,
        availableInterpreters: action.availableInterpreters,
        error: null,
        loading: false,
      };
    case FETCH_AVAILABLE_INTERPRETERS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
