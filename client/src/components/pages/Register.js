import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


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

    this.props.registerUser(userDetails);
  }

  render() {
    return (
      <div>

        <div className="login-box">
          <div className="auth-header">
            <span className="auth-intro-text">
              Welcome. Please Register. {this.props.success}
            </span>
          </div>

          <form
            className="form form-login"
            onSubmit={this.onSubmit}>
            <div className="input-group">
              <span className="input-group-addon">
                <FontAwesomeIcon icon="user" />
              </span>
              <input
                className="form-control"
                placeholder="Fullname"
                type="text" name="fullname"
                value={this.state.fullname} onChange={this.onChange}/>
            </div>

            <div className="input-group">
              <span className="input-group-addon">
                <FontAwesomeIcon icon="lock" />
              </span>
              <input
                className="form-control"
                placeholder="Email"
                type="text" name="email"
                value={this.state.email} onChange={this.onChange}/>
            </div>

            <div className="input-group">
              <span className="input-group-addon">
                <FontAwesomeIcon icon="lock" />
              </span>
              <input
                className="form-control"
                placeholder="Username"
                type="text" name="username"
                value={this.state.username} onChange={this.onChange}/>
            </div>

            <div className="input-group">
              <span className="input-group-addon">
                <FontAwesomeIcon icon="lock" />
              </span>
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
          <div className="login-footer">
            <div className="row justify-content-md-center">
              <div className="col-md-5">
                <Link className="link float-right" to="/">Home</Link>
              </div>
              <div className="col-md-5">
                <Link className="link float-left" to="/Login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  message: PropTypes.string,
  success: PropTypes.bool
};

const mapStateToProps = state => ({
  success: state.auth.success,
  message: state.auth.message
});

export default connect(mapStateToProps, { registerUser })(Register);
