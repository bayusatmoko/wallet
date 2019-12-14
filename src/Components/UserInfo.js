import React from 'react';
import PropTypes from 'prop-types';
import background from '../assets/images/background.jpg';

class UserInfo extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <li>
        <div className="user-view user-info">
          <div className="background">
            <img className="background-nav" src={background} alt="user background" />
          </div>
          <i className="material-icons user-image large">account_circle</i>
          <h5 className="user-name">{user.name}</h5>
          <div>
            <i className="material-icons">phone</i>
            <span style={{ fontSize: 20, marginLeft: 20 }} className="user-phone">{user.phoneNumber}</span>
          </div>
          <div>
            <i className="material-icons">email</i>
            <span style={{ fontSize: 20, marginLeft: 10 }} className="user-email">{user.email}</span>
          </div>
        </div>
      </li>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired
};

export default UserInfo;
