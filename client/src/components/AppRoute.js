import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const checker = true;

const AppRoute = ({
  component: Component, layout: Layout, ...rest
}) => (
  // eslint-disable-next-line
  <Route {...rest} render={props => (
    checker ? (
      <Layout>
        <Component {...props} />
      </Layout>
    ) : (
      <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
    )
  )} />
);

AppRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  layout: PropTypes.func,
  auth: PropTypes.bool
};

export default AppRoute;
