import {
  BOOKING_REQUEST_FAILED,
  BOOKING_REQUEST_STARTED,
  BOOKING_REQUEST_SUCCESS,
  CLEAR_BOOKING_ERROR,
  CLEAR_BOOKING_SUCCESS,
  FETCH_AVAILABLE_INTERPRETERS_FAILED,
  FETCH_AVAILABLE_INTERPRETERS_STARTED,
  FETCH_AVAILABLE_INTERPRETERS_SUCCESS,
  SAVE_SELECTED_DATES,
} from './booking-action-constants';

const initialState = {
  loading: false,
  error: null,
  availableInterpreters: null,
  booking: null,
  startDate: null,
  endDate: null,
  success: false,
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
    case BOOKING_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_REQUEST_SUCCESS:
      return {
        ...state,
        booking: action.booking,
        error: null,
        loading: false,
      };
    case BOOKING_REQUEST_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CLEAR_BOOKING_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_BOOKING_SUCCESS:
      return {
        ...state,
        booking: null,
      };
    default:
      return state;
  }
}
