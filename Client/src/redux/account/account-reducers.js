import {
  ACCOUNT_SIGN_IN_FAILED,
  ACCOUNT_SIGN_IN_STARTED,
  ACCOUNT_SIGN_IN_SUCCESS,
  ACCOUNT_SIGN_OUT,
  ACCOUNT_SIGN_UP_FAILED,
  ACCOUNT_SIGN_UP_STARTED,
  ACCOUNT_SIGN_UP_SUCCESS,
  CLEAR_ACCOUNT_ERROR,
  CLEAR_ACCOUNT_HAS_UPDATED,
  UPDATE_ACCOUNT_FAILED,
  UPDATE_ACCOUNT_STARTED,
  UPDATE_ACCOUNT_SUCCESS,
} from './account-action-constants';

const initialState = {
  loading: false,
  details: null,
  isAuthenticated: false,
  error: null,
  hasUpdated: false,
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
        isAuthenticated: true,
      };
    case ACCOUNT_SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
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
        hasUpdated: true,
      };
    case UPDATE_ACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ACCOUNT_SIGN_OUT:
      return {
        ...state,
        ...initialState,
      };
    case CLEAR_ACCOUNT_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ACCOUNT_HAS_UPDATED:
      return {
        ...state,
        hasUpdated: false,
      };
    default:
      return state;
  }
}
