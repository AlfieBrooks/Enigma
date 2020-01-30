import {
  ACCOUNT_SIGN_IN_FAILED,
  ACCOUNT_SIGN_IN_STARTED,
  ACCOUNT_SIGN_IN_SUCCESS,
  ACCOUNT_SIGN_OUT,
  ACCOUNT_SIGN_UP_FAILED,
  ACCOUNT_SIGN_UP_STARTED,
  ACCOUNT_SIGN_UP_SUCCESS,
  UPDATE_ACCOUNT_STARTED,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILED,
} from './account-action-constants';

const initialState = {
  loading: false,
  details: {},
  authenticated: false,
  error: null,
  signInError: false,
  signUpError: false,
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_SIGN_IN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.details,
        error: null,
        authenticated: true,
      };
    case ACCOUNT_SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        signInError: true,
      };
    case ACCOUNT_SIGN_UP_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ACCOUNT_SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        signUpError: true,
      };
    case UPDATE_ACCOUNT_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.details,
        error: null,
      };
    case UPDATE_ACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        signUpError: true,
      };
    case ACCOUNT_SIGN_OUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
