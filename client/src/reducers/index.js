import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import { reducer as toastrReducer } from 'react-redux-toastr';

import noteReducer from './noteReducer';
import authReducer from './authReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const rootReducer = combineReducers({
  journal: noteReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  // toastr: toastrReducer,
});

export default rootReducer;
