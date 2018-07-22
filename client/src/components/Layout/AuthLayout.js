import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthLayout extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 fullheight fullimage">
              <div className="row"/>
            </div>
            <div className="col-md-6">
              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <div className="auth-box form-margin">
                    <div className="logo-box">
                      <img src={'logo.png'}/>
                    </div>
                    <main className="">{this.props.children}</main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthLayout;
