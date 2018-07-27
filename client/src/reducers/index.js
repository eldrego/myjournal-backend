import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  auth: authReducer
});

export default rootReducer;
