import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
  }

  render() {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <span className="user-name">Username here</span>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Profile</a>
          <a className="dropdown-item" href="#">Settings</a>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item" to="/logout">Logout</Link>
        </div>
      </li>
    );
  }
}

UserMenu.propTypes = {
  user: PropTypes.string,
};

export default UserMenu;
