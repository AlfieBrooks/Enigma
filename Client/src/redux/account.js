//Actions
const ACCOUNT_SIGNIN = 'ACCOUNT_SIGNIN';
const ACCOUNT_SIGNOUT = 'ACCOUNT_SIGNOUT';
const ACCOUNT_SIGNIN_ERROR = 'ACCOUNT_SIGNIN_ERROR';

//Action Creators
const signIn = email => ({ type: ACCOUNT_SIGNIN, email });
const signOut = () => ({ type: ACCOUNT_SIGNOUT });
const signInError = error => ({ type: ACCOUNT_SIGNIN_ERROR, error });

//Thunk
export const accountSignIn = (email, password) => {
  return dispatch => {
    fetch('http://localhost:443/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        email: email,
        password: password,
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(signInError(result.error));
        } else {
          return dispatch(signIn(email));
        }
      })
      .catch(e => {
        return dispatch(
          signInError('It looks like somethings gone wrong, please try again later.')
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
export default function account(
  state = { email: null, authenticated: false, error: null, signInError: false },
  action
) {
  switch (action.type) {
    case ACCOUNT_SIGNIN:
      return {
        ...state,
        email: action.email,
        authenticated: true,
      };
    case ACCOUNT_SIGNOUT:
      return {
        ...state,
        email: null,
        authenticated: false,
      };
    case ACCOUNT_SIGNIN_ERROR:
      return {
        ...state,
        error: action.error,
        signInError: true,
      };

    default:
      return state;
  }
}
