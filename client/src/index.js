import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
// import ReduxToastr from 'react-redux-toastr';

// import store from './store';
import { persistor, store } from './store';
import Loading from './components/Loading';
import App from './components/App';
// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

require('./sass/styles.scss');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);

// <ReduxToastr
//   timeOut={4000}
//   newestOnTop={false}
//   preventDuplicates
//   position="top-center"
//   transitionIn="fadeIn"
//   transitionOut="fadeOut"
//   progressBar={false}
//   closeOnToastrClick/>
