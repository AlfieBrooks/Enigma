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
  FETCH_BOOKED_INTERPRETERS,
  FETCH_BOOKED_INTERPRETERS_SUCCESS,
  FETCH_BOOKED_INTERPRETERS_FAILED,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAILED,
} from './booking-action-constants';

const initialState = {
  loading: false,
  error: null,
  availableInterpreters: [],
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
      }
    case FETCH_BOOKED_INTERPRETERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKED_INTERPRETERS_SUCCESS:
      return {
        ...state,
        bookings: action.bookings,
        error: null,
        loading: false,
      };
    case FETCH_BOOKED_INTERPRETERS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_BOOKING_SUCCESS:
      //This is fucking nasty
      state.bookings.find(b => b._id === action.id).status = action.result.action;
      return {
        ...state,
        bookings: [ ...state.bookings ],
      };
    case UPDATE_BOOKING_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
