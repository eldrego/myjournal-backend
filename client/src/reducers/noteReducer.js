import { noteConstants } from '../constants';

const initialState = {
  notes: [],
  userNotes: [],
  oneNote: {}
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
  case noteConstants.FETCH_NOTES:
    return {
      ...state,
      notes: action.payload
    };
  case noteConstants.FETCH_ONE_NOTE:
    return {
      ...state,
      oneNote: action.payload
    };
  case noteConstants.FETCH_USER_NOTES:
    return {
      ...state,
      userNotes: action.payload
    };
  case noteConstants.ADD_NOTE:
    return {
      ...state,
      userItems: [...state.userItems, action.payload]
    };
  default:
    return state;
  }
};

export default noteReducer;
