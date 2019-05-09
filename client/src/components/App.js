import React from 'react';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStroopwafel,
  faLock, faUser, faPlus,
  faLink, faTrash, faCoffee, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import AppRoute from './AppRoute';
import PageLayout from './Layout/PageLayout';
import AuthLayout from './Layout/AuthLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Authenticator from './pages/Authenticator';
import AddNote from './pages/AddNote';
import UserNotes from './pages/UserNotes';
import OneNote from './pages/OneNote';

library.add(faCoffee, faSpinner, faStroopwafel, faLink, faLock, faUser, faPlus, faTrash);

const App = () => (
  <BrowserRouter>
    <Switch>
      <AppRoute exact path="/auth" layout={AuthLayout} component={Authenticator}/>
      <AppRoute exact path="/" layout={PageLayout} component={Home}/>
      <AppRoute exact path="/create-note" layout={PageLayout} component={AddNote} />
      <AppRoute exact path="/notes" layout={PageLayout} component={UserNotes} />
      <AppRoute exact path="/notes/:noteID" layout={PageLayout} component={OneNote} />
      <AppRoute path="*" layout={PageLayout} component={NotFound} />
    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  match: PropTypes.object,
};

export default App;
