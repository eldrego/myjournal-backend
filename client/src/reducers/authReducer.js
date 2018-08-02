import { authConstants } from '../constants';

const initialState = {
  success: false,
  message: '',
  token: '',
  loggedIn: false,
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
      token: action.payload.token,
      message: action.payload.message
    };
  case authConstants.LOGIN_FAILURE:
    return {
      ...state,
      loggedIn: action.payload.success,
      message: action.payload.message
    };
  // case authConstants.VALIDATE_REQUEST:
  //   return {
  //     ...state,
  //     loggedIn: false
  //   };
  // case authConstants.VALIDATE_SUCCESS:
  //   return {
  //     ...state,
  //     loggedIn: action.payload.success,
  //     token: action.payload.token,
  //     message: action.payload.message
  //   };
  // case authConstants.VALIDATE_FAILURE:
  //   return {
  //     ...state,
  //     loggedIn: action.payload.success,
  //     message: action.payload.message
  //   };
  default:
    return state;
  }
};

export default authReducer;
