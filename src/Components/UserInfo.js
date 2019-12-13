import React from 'react';
import PropTypes from 'prop-types';
import background from '../assets/images/background.jpg';
import phoneImage from '../phones-img.png';
import emailImage from '../email-icon.png';

class UserInfo extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <li>
        <div className="user-view user-info">
          <div className="background">
            <img className="background-nav" src={background} alt="user background" />
          </div>
          <img className="circle user-image" src="assets/images/user-icon.png" alt="user icon" />
          <h5 className="user-name">{user.name}</h5>
          <div>
            <img style={{ width: 20, height: 20 }} src={phoneImage} alt="" />
            <span style={{ fontSize: 20, marginLeft: 20 }} className="user-phone">{user.phoneNumber}</span>
          </div>
          <div>
            <img style={{ width: 30, height: 20 }} src={emailImage} alt="" />
            <span style={{ fontSize: 20, marginLeft: 10 }} className="user-email">{user.email}</span>
          </div>
        </div>
      </li>
    );
  }
}

export default UserInfo;
