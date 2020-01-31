import { NODE_SERVER_URI } from '../../utils/config';
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

// Action Creators
const clearError = () => ({ type: CLEAR_ACCOUNT_ERROR });
const signInFailed = error => ({ type: ACCOUNT_SIGN_IN_FAILED, error });
const signInStarted = () => ({ type: ACCOUNT_SIGN_IN_STARTED });
const signInSuccess = details => ({ type: ACCOUNT_SIGN_IN_SUCCESS, details });
const signOut = () => ({ type: ACCOUNT_SIGN_OUT });
const signUpFailed = error => ({ type: ACCOUNT_SIGN_UP_FAILED, error });
const signUpStarted = () => ({ type: ACCOUNT_SIGN_UP_STARTED });
const signUpSuccess = () => ({ type: ACCOUNT_SIGN_UP_SUCCESS });
const updateAccountFailed = error => ({ type: UPDATE_ACCOUNT_FAILED, error });
const updateAccountStarted = () => ({ type: UPDATE_ACCOUNT_STARTED });
const updateAccountSuccess = details => ({ type: UPDATE_ACCOUNT_SUCCESS, details });
const clearHasUpdated = () => ({ type: CLEAR_ACCOUNT_HAS_UPDATED });

// Thunk
export const accountSignIn = (email, password) => {
  return dispatch => {
    dispatch(signInStarted());
    fetch(`${NODE_SERVER_URI}/account/sign-in`, {
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

export const clearAccountError = () => {
  return dispatch => {
    dispatch(clearError());
  };
};

export const clearAccountHasUpdated = () => {
  return dispatch => {
    dispatch(clearHasUpdated());
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

    fetch(`${NODE_SERVER_URI}/account/sign-up`, {
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

    fetch(`${NODE_SERVER_URI}/account/sign-up`, {
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

export const updateCompanyAccount = ({ _id, accountType, updatedCompanyName }) => {
  return dispatch => {
    dispatch(updateAccountStarted());

    if (!updatedCompanyName) {
      return dispatch(updateAccountFailed('Please fill out all fields'));
    }

    fetch(`${NODE_SERVER_URI}/account/update-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        _id,
      },
      body: JSON.stringify({
        account_type: accountType,
        company_name: updatedCompanyName,
      }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(updateAccountFailed(result.error));
        }
        return dispatch(updateAccountSuccess(result));
      })
      .catch(e => {
        return dispatch(
          updateAccountFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`)
        );
      });
  };
};

export const updateInterpreterAccount = ({
  _id,
  accountType,
  updatedFirstName,
  updatedLastName,
  updatedPostcode,
  updatedHourlyRate,
  updatedMaxDistance,
  updatedMembershipId,
  updatedMembershipExpiry,
}) => {
  return dispatch => {
    dispatch(updateAccountStarted());

    if (
      !updatedFirstName ||
      !updatedLastName ||
      !updatedPostcode ||
      !updatedHourlyRate ||
      !updatedMaxDistance ||
      !updatedMembershipId ||
      !updatedMembershipExpiry
    ) {
      return dispatch(updateAccountFailed('Please fill out all fields'));
    }

    fetch(`${NODE_SERVER_URI}/account/update-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        _id,
      },
      body: JSON.stringify({
        account_type: accountType,
        first_name: updatedFirstName,
        last_name: updatedLastName,
        postcode: updatedPostcode,
        hourly_rate: updatedHourlyRate,
        max_distance: updatedMaxDistance,
        membership_id: updatedMembershipId,
        membership_expiry: updatedMembershipExpiry,
      }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return dispatch(updateAccountFailed(result.error));
        }
        return dispatch(updateAccountSuccess(result.user));
      })
      .catch(e => {
        return dispatch(
          updateAccountFailed(`'${e.message}' - It looks like somethings gone wrong, please try again later.`)
        );
      });
  };
};
