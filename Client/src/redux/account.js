//Actions
const ACCOUNT_SIGN_IN_STARTED = 'ACCOUNT_SIGN_IN_STARTED';
const ACCOUNT_SIGN_IN_SUCCESS = 'ACCOUNT_SIGN_IN_SUCCESS';
const ACCOUNT_SIGN_IN_FAILED = 'ACCOUNT_SIGN_IN_FAILED';
const ACCOUNT_SIGN_UP_STARTED = 'ACCOUNT_SIGN_UP_STARTED';
const ACCOUNT_SIGN_UP_SUCCESS = 'ACCOUNT_SIGN_UP_SUCCESS';
const ACCOUNT_SIGN_UP_FAILED = 'ACCOUNT_SIGN_UP_FAILED';
const ACCOUNT_SIGN_OUT = 'ACCOUNT_SIGN_OUT';

// Action Creators
const signInStarted = () => ({ type: ACCOUNT_SIGN_IN_STARTED });
const signInSuccess = email => ({ type: ACCOUNT_SIGN_IN_SUCCESS, email });
const signInFailed = error => ({ type: ACCOUNT_SIGN_IN_FAILED, error });
const signUpStarted = () => ({ type: ACCOUNT_SIGN_UP_STARTED });
const signUpSuccess = email => ({ type: ACCOUNT_SIGN_UP_SUCCESS, email });
const signUpFailed = error => ({ type: ACCOUNT_SIGN_UP_FAILED, error });
const signOut = () => ({ type: ACCOUNT_SIGN_OUT });

// Thunk
export const accountSignIn = (email, password) => {
  return dispatch => {
    dispatch(signInStarted());
    fetch('http://localhost:443/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        email,
        password,
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(signInFailed(result.error));
        }
        return dispatch(signInSuccess(email));
      })
      .catch(e => {
        return dispatch(
          signInFailed(
            `'${e.message}' - It looks like somethings gone wrong, please try again later.`
          )
        );
      });
  };
};

export const accountSignOut = () => {
  return dispatch => {
    dispatch(signOut());
  };
};

export const accountSignUp = (email, password) => {
  return dispatch => {
    dispatch(signUpStarted());
    fetch('http://localhost:443/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        membershipExpiry: '1',
        membership: '1',
      }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(signUpFailed(result.error));
        } else {
          accountSignIn(email, password);
          return dispatch(signUpSuccess(email));
        }
      })
      .catch(e => {
        return dispatch(
          signUpFailed(
            `'${e.message}' - It looks like somethings gone wrong, please try again later.`
          )
        );
      });
  };
};

// Reducer
const initialState = {
  loading: false,
  email: null,
  authenticated: false,
  error: null,
  signInError: false,
  signUpError: false,
};

export default function account(state = initialState, action) {
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
        email: action.email,
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
        email: action.email,
      };
    case ACCOUNT_SIGN_UP_FAILED:
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
