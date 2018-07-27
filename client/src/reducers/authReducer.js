import { authConstants } from '../constants';

const initialState = {
  success: false,
  message: ''
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
  default:
    return state;
  }
};

export default authReducer;
