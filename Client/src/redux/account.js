//Actions
const ACCOUNT_SIGN_IN_STARTED = 'ACCOUNT_SIGN_IN_STARTED';
const ACCOUNT_SIGN_IN_SUCCESS = 'ACCOUNT_SIGN_IN_SUCCESS';
const ACCOUNT_SIGN_IN_FAILED = 'ACCOUNT_SIGN_IN_FAILED';
const ACCOUNT_SIGN_OUT = 'ACCOUNT_SIGN_OUT';

//Action Creators
const signInStarted = () => ({ type: ACCOUNT_SIGN_IN_STARTED });
const signInSuccess = email => ({ type: ACCOUNT_SIGN_IN_SUCCESS, email });
const signInFailed = error => ({ type: ACCOUNT_SIGN_IN_FAILED, error });
const signOut = () => ({ type: ACCOUNT_SIGNOUT });

//Thunk
export const accountSignIn = (email, password) => {
  return dispatch => {
    dispatch(signInStarted())
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
        } else {
          return dispatch(signInSuccess(email));
        }
      })
      .catch(e => {
        return dispatch(
          signInFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`)
        );
      });
  };
};

export const accountSignOut = () => {
  return dispatch => {
    dispatch(signOut());
  };
};

// Reducer
const initialState = {
  loading: false,
  email: null,
  authenticated: false,
  error: null,
  signInError: false,
}

export default function account(
  state = initialState,
  action
) {
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
    case ACCOUNT_SIGN_OUT:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
}
