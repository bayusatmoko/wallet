import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import Wallet from '../Components/Wallet';
import WalletError from '../Components/WalletError';
import TransactionError from '../Components/TransactionError';
import TransactionList from '../Components/TransactionList';

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      errorTransaction: '',
      errorWallet: '',
      userId: 1,
      user: {},
      wallet: {}
    };
  }

  async componentDidMount() {
    await this._fetchWallet();
    await this._fetchUser();
    await this._fetchLastTransaction();
  }

  _fetchWallet = async () => {
    const { userId } = this.state;
    const { API_URL } = this.props;
    try {
      const { data: wallet } = await axios.get(`${API_URL}/users/${userId}/wallets`);
      this.setState({ wallet, errorWallet: '' });
    } catch (e) {
      this.setState({ errorWallet: e.message });
    }
  };

  _fetchUser = async () => {
    const { userId } = this.state;
    const { API_URL } = this.props;
    try {
      const { data: user } = await axios.get(`${API_URL}/users/${userId}`);
      console.log(user);
      this.setState({ user, errorWallet: '' });
    } catch (e) {
      this.setState({ errorWallet: e.message });
    }
  };

  _fetchLastTransaction = async () => {
    const { API_URL } = this.props;
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      this.setState({ transactions: response.data, errorTransaction: '' });
    } catch (e) {
      this.setState({ errorTransaction: e.message });
    }
  };

  render() {
    const {
      wallet, errorWallet, transactions, errorTransaction, user
    } = this.state;
    return (
      <div className="row">
        <div className="row" />
        {!errorWallet ? <Wallet wallet={wallet} user={user} />
          : <WalletError message={errorWallet} />}
        <br />
        {!errorTransaction
          ? <TransactionList transactions={transactions} />
          : <TransactionError message={errorTransaction} />}
      </div>
    );
  }
}


DashboardContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};
export default DashboardContainer;
