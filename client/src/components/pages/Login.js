import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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

    console.log(userCredentials);

    // this.props.addArticle(article);
  }

  render() {
    return (
      <div>

        <div className="login-box">
          <div className="auth-header">
            <span className="auth-intro-text">
              Welcome. Please login.
            </span>
          </div>

          <form
            autoComplete="off"
            className="form form-login"
            onSubmit={this.onSubmit}>
            <div className="input-group">
              <span className="input-group-addon">
                <FontAwesomeIcon icon="user" />
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
                <Link className="link float-left" to="/Register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
