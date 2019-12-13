import React from 'react';
import PropTypes from 'prop-types';
import background from '../assets/images/background.jpg';

class UserInfo extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <li>
        <div className="user-view">
          <div className="background">
            <img className="background-nav" src={background} alt="user background" />
          </div>
          <img className="circle user-image" src="assets/images/user-icon.png" alt="user icon" />
          <span className="user-name">{user.name}</span>
          <span className="email">{user.email}</span>
        </div>
      </li>
    );
  }
}

export default UserInfo;
