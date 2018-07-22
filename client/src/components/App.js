import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  browserHistory,
  Route,
  Switch
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStroopwafel,
  faLock, faUser,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import PageLayout from './Layout/PageLayout';
import AuthLayout from './Layout/AuthLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

library.add(faStroopwafel, faLink, faLock, faUser);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route path="/login" render={() => <AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" render={() => <AuthLayout><Register /></AuthLayout>} />
          <Route exact path="/" render={() => <PageLayout><Home /></PageLayout>}/>
          <Route exact path="/about" render={() => <PageLayout><About /></PageLayout>}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
