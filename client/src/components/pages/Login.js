import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { toastr } from 'react-redux-toastr';
import { loginUser, logoutUser } from '../../actions/authActions';
// import Alert from '../common/Alert';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.verifyLogin();
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const userCredentials = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.loginUser(userCredentials, this.props.history);
  }

  verifyLogin() {
    if (this.props.loggedIn) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <div className="login-box">
          <div className="auth-header">
            <span className="auth-intro-text text-center">
              <p>Welcome</p>
              <h4>Login to your Account</h4>
            </span>
          </div>

          <form
            autoComplete="off"
            className="form form-login"
            onSubmit={this.onSubmit}>
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Username"
                type="text" name="username"
                value={this.state.username} onChange={this.onChange}/>
            </div>

            <div className="input-group">
              <input
                className="form-control"
                placeholder="Password"
                type="password" name="password"
                value={this.state.password} onChange={this.onChange}/>
            </div>
            <button
              className="col-md-12 btn btn-journal"
              type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object,
  message: PropTypes.string,
  success: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  success: state.auth.success,
  message: state.auth.message,
  loggedIn: state.auth.loggedIn
});

export default withRouter(connect(mapStateToProps, { loginUser, logoutUser })(Login));
