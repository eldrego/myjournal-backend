import axios from 'axios';
import { authConstants } from '../constants';
import history from '../helpers/history';

export const registerRequest = userDetails => ({
  type: authConstants.REGISTER_REQUEST,
  payload: userDetails
});

export const registerSuccess = registerResponse => ({
  type: authConstants.REGISTER_SUCCESS,
  payload: registerResponse
});

export const registerFailure = error => ({
  type: authConstants.REGISTER_FAILURE,
  payload: error
});

export const registerUser = userDetails => (dispatch) => {
  dispatch(registerRequest(userDetails));

  axios.post('/api/v1/register', userDetails)
    .then((response) => {
      dispatch(registerSuccess(response.data));

      // history.push('/login');
    })
    .catch((error) => {
      dispatch(registerFailure(error));
      // dispatch(alertActions.error(error.toString()));
    })
    .then(() => {
    // always executed
    });
};

export const loginRequest = userDetails => ({
  type: authConstants.LOGIN_REQUEST,
  payload: userDetails
});

export const loginSuccess = userDetails => ({
  type: authConstants.LOGIN_SUCCESS,
  payload: userDetails
});

export const loginFailure = error => ({
  type: authConstants.LOGIN_FAILURE,
  payload: error
});

export const loginUser = userDetails => (dispatch) => {
  dispatch(loginRequest());
  axios.post('/api/v1/login', userDetails)
    .then((response) => {
      dispatch(loginSuccess(response.data));
      history.push('/');
    })
    .catch((error) => {
      dispatch(loginFailure(error));
      // dispatch(alertActions.error(error.toString()));
    })
    .then(() => {
    // always executed
    });
};
