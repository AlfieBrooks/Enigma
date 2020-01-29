import {
  SAVE_SELECTED_DATES,
  FETCH_AVAILABLE_INTERPRETERS_STARTED,
  FETCH_AVAILABLE_INTERPRETERS_SUCCESS,
  FETCH_AVAILABLE_INTERPRETERS_FAILED,
  BOOKING_REQUEST_STARTED,
  BOOKING_REQUEST_SUCCESS,
  BOOKING_REQUEST_FAILED,
} from './booking-action-constants';

const initialState = {
  loading: false,
  error: null,
  availableInterpreters: [],
  booking: [],
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
    default:
      return state;
  }
}
