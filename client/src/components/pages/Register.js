import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
// import checkAuth from '../../utils/checkAuth';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      fullname: '',
      email: '',
      password: '',
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    this.verifyLogin();
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const userDetails = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      fullname: this.state.fullname,
    };

    this.props.registerUser(userDetails, this.props.history);
  }

  verifyLogin() {
    if ((this.props.loggedIn)) {
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
              <h4>Register</h4>
            </span>
          </div>

          <form
            autoComplete="off"
            className="form form-login"
            onSubmit={this.onSubmit}>
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Fullname"
                type="text" name="fullname"
                value={this.state.fullname} onChange={this.onChange}/>
            </div>

            <div className="input-group">
              <input
                className="form-control"
                placeholder="Email"
                type="text" name="email"
                value={this.state.email} onChange={this.onChange}/>
            </div>

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
              type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { registerUser })(Register);
