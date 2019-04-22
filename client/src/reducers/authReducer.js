import { authConstants } from '../constants';

const initialState = {
  user: '',
  success: false,
  message: '',
  token: '',
  loggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case authConstants.REGISTER_REQUEST:
    return {
      ...state,
      success: false
    };
  case authConstants.REGISTER_SUCCESS:
    return {
      ...state,
      success: action.payload.success,
      message: action.payload.message
    };
  case authConstants.REGISTER_FAILURE:
    return {
      ...state,
      success: action.payload.success,
      message: action.payload.message
    };
  case authConstants.LOGIN_REQUEST:
    return {
      ...state,
      loggedIn: false,
    };
  case authConstants.LOGIN_SUCCESS:
    return {
      ...state,
      loggedIn: action.payload.success,
      success: action.payload.success,
      token: action.payload.token,
      message: action.payload.message,
      user: action.payload.username
    };
  case authConstants.LOGIN_FAILURE:
    return {
      ...state,
      loggedIn: action.payload.success,
      message: action.payload.message
    };
  case authConstants.LOGOUT_REQUEST:
    return {
      ...state,
      loggedIn: true
    };
  case authConstants.LOGOUT_SUCCESS:
    return {
      ...state,
      loggedIn: !action.payload.success,
      token: action.payload.token,
      message: action.payload.message,
      user: '',
    };
  case authConstants.LOGOUT_FAILURE:
    return {
      ...state
    };
  default:
    return state;
  }
};

export default authReducer;
