import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch
} from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthLayout = (props) => {
  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row justify-content-md-center">
              <div className="col-md-4">
                <div className="auth-box form-margin">
                  <div className="logo-box"/>
                  <Switch>
                    <Route path={`${props.match.path}/login`} exact component={Login} />
                    <Route path={`${props.match.path}/register`} exact component={Register} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  match: PropTypes.object,
};

export default AuthLayout;
