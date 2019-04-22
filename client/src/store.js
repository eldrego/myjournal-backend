import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const enhancer = compose(
  applyMiddleware(thunk)
);

export const store = createStore(
  reducers,
  composeWithDevTools(enhancer)
);

export const persistor = persistStore(store);

// applyMiddleware(createLogger(), thunk)
