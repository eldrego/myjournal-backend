import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';

// import store from './store';
import { persistor, store } from './store';
import Loading from './components/Loading';
import App from './components/App';

require('./styles.scss');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
