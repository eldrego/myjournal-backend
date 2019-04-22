import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class Authenticator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignIn: true
    };
    
    this.switchState = this.switchState.bind(this);
  }

  switchState() {
    this.setState({
      showSignIn: !this.state.showSignIn
    });
  }

  render() {
    const { showSignIn } = this.state;
    return (
      <Fragment>
        <div>
          { showSignIn ? (<Login />) : (<Register />) }
          <div className="login-footer">
            <div className="footer">
              <div className="row justify-content-md-center">
                <div className="col-md-12">
                  { showSignIn
                    ? (<p>Dont have an account?
                      <a
                        className="link"
                        onClick={this.switchState}
                        href="#">Register</a></p>)
                    : (<p>Already have an account?
                      <a
                        className="link"
                        onClick={this.switchState}
                        href="#">Login</a></p>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Authenticator);
