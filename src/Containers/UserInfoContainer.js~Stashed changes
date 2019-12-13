import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import Wallet from '../Components/Wallet';
import WalletError from '../Components/WalletError';
import TransactionError from '../Components/TransactionError';
import TransactionList from '../Components/TransactionList';
import UserInfo from '../Components/UserInfo';

class UserInfoContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    await this._fetchUser();
  }

    _fetchUser = async () => {
      const userId = 1;
      const fetchUserUrl = `http://localhost:3000/users/${userId}`;
      try {
        const { data: user } = await axios.get(fetchUserUrl);
        this.setState({ user });
      } catch (e) {
        console.log(e.message);
      }
    };

    render() {
      const { user } = this.state;
      return (
        <UserInfo user={user} />
      );
    }
}

export default UserInfoContainer;
