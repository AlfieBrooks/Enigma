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
        return dispatch(signInFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`));
      });
  };
};

export const accountSignOut = () => {
  return dispatch => {
    dispatch(signOut());
  };
};

export const accountSignUp = ({ accountType, email, password, confirmPassword }) => {
  return dispatch => {
    dispatch(signUpStarted());

    if (!email || !password || !confirmPassword) {
      return dispatch(signUpFailed('Please fill out all fields'));
    }

    if(password !== confirmPassword) {
      return dispatch(signUpFailed('Passwords do not match'));
    }

    fetch('http://localhost:443/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        membershipExpiry: '1',
        membership: '1',
      }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(signUpFailed(result.error));
        }
        dispatch(signUpSuccess(email));
        return dispatch(accountSignIn(email, password));
      })
      .catch(e => {
        return dispatch(signUpFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`));
      });
  };
};
