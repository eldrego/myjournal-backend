import { noteConstants } from '../constants';

const initialState = {
  items: [],
  userItems: [],
  item: {}
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
  case noteConstants.ADD_NOTE:
    return {
      ...state,
      userItems: [...state.userItems, action.payload]
    };
  case noteConstants.FETCH_NOTES:
    return {
      ...state,
      items: action.payload
    };
  case noteConstants.FETCH_USER_NOTES:
    return {
      ...state,
      userItems: action.payload
    };
  default:
    return state;
  }
};

export default noteReducer;
