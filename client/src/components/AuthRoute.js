// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import checkAuth from '../utils/checkAuth';


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
    )
  )} />
);

AuthRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

export default AuthRoute;
