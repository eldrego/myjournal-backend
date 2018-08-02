import React from 'react';
import {
  BrowserRouter,
  browserHistory,
  Route,
  Switch
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStroopwafel,
  faLock, faUser,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import AuthRoute from './AuthRoute';
import PageLayout from './Layout/PageLayout';
import AuthLayout from './Layout/AuthLayout';
import NotFound from './pages/NotFound';

library.add(faStroopwafel, faLink, faLock, faUser);

const App = props => (
  <BrowserRouter history={browserHistory}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <AuthRoute path="/" component={PageLayout} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
