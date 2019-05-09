import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../public/logo.png';

const AuthLayout = (props) => {
  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="row justify-content-md-center">
              <div className="col-md-7">
                <div className="auth-box form-margin">
                  <div className="logo-box">
                    <img src={logo}/>
                  </div>
                  { props.children }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 fullHeight">
            <div className="fullImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  match: PropTypes.object,
  children: PropTypes.object,
};

export default AuthLayout;
