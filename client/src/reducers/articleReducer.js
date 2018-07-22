import { ADD_ARTICLE, FETCH_ARTICLES } from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {}
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_ARTICLE:
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  case FETCH_ARTICLES:
    return {
      ...state,
      items: action.payload
    };
  default:
    return state;
  }
};

export default articleReducer;
