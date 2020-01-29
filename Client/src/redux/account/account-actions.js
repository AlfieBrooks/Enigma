import {
  ACCOUNT_SIGN_IN_FAILED,
  ACCOUNT_SIGN_IN_STARTED,
  ACCOUNT_SIGN_IN_SUCCESS,
  ACCOUNT_SIGN_OUT,
  ACCOUNT_SIGN_UP_FAILED,
  ACCOUNT_SIGN_UP_STARTED,
  ACCOUNT_SIGN_UP_SUCCESS,
} from './account-action-constants';

// Action Creators
const signInStarted = () => ({ type: ACCOUNT_SIGN_IN_STARTED });
const signInSuccess = details => ({ type: ACCOUNT_SIGN_IN_SUCCESS, details });
const signInFailed = error => ({ type: ACCOUNT_SIGN_IN_FAILED, error });
const signUpStarted = () => ({ type: ACCOUNT_SIGN_UP_STARTED });
const signUpSuccess = () => ({ type: ACCOUNT_SIGN_UP_SUCCESS });
const signUpFailed = error => ({ type: ACCOUNT_SIGN_UP_FAILED, error });
const signOut = () => ({ type: ACCOUNT_SIGN_OUT });

// Thunk
export const accountSignIn = (email, password) => {
  return dispatch => {
    dispatch(signInStarted());
    fetch('http://localhost:443/sign-in', {
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
        return dispatch(signInSuccess(result));
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

export const accountCompanySignUp = ({ accountType, companyName, email, password, confirmPassword }) => {
  return dispatch => {
    dispatch(signUpStarted());

    if (!companyName || !email || !password || !confirmPassword) {
      return dispatch(signUpFailed('Please fill out all fields'));
    }

    if (password !== confirmPassword) {
      return dispatch(signUpFailed('Passwords do not match'));
    }

    fetch('http://localhost:443/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_type: accountType,
        company_name: companyName,
        email,
        password,
      }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(signUpFailed(result.error));
        }
        dispatch(signUpSuccess());
        return dispatch(accountSignIn(email, password));
      })
      .catch(e => {
        return dispatch(signUpFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`));
      });
  };
};

export const accountInterpreterSignUp = ({
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  postcode,
  hourlyRate,
  maxDistance,
  membershipId,
  membershipExpiry,
}) => {
  return dispatch => {
    dispatch(signUpStarted());

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !postcode ||
      !hourlyRate ||
      !maxDistance ||
      !membershipId ||
      !membershipExpiry
    ) {
      return dispatch(signUpFailed('Please fill out all fields'));
    }

    if (password !== confirmPassword) {
      return dispatch(signUpFailed('Passwords do not match'));
    }

    fetch('http://localhost:443/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_type: accountType,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        postcode,
        hourly_rate: hourlyRate,
        max_distance: maxDistance,
        membership_id: membershipId,
        membership_expiry: membershipExpiry,
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
