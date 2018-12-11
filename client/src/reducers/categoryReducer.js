import { categoryConstants } from '../constants';

const initialState = {
  list: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
  case categoryConstants.FETCH_CATEGORIES:
    return {
      ...state,
      list: action.payload
    };
  default:
    return state;
  }
};

export default categoryReducer;
