import React from 'react';
import PropTypes from 'prop-types';
import background from '../assets/images/background.jpg';
import phoneImage from '../phones-img.png';

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
          <br />
          <img style={{ width: 20, height: 20 }} src={phoneImage} alt="" />
          <span style={{ fontSize: 25, marginLeft: 10 }} className="user-phone">{user.phoneNumber}</span>
          <span className="email">{user.email}</span>
        </div>
      </li>
    );
  }
}

export default UserInfo;
