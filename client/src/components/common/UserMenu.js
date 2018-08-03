import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserMenu = (props) => {
  console.log(props);
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        Username <FontAwesomeIcon icon="lock" />
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#">Profile</a>
        <a className="dropdown-item" href="#">Settings</a>
        <div className="dropdown-divider"/>
        <a className="dropdown-item" href="#">Logout</a>
      </div>
    </li>
  );
};

export default UserMenu;
