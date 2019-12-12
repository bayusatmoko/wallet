import React from 'react';
import axios from 'axios';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import Wallet from '../Components/Wallet';
import WalletError from '../Components/WalletError';
import TransactionError from '../Components/TransactionError';
import LastTransaction from '../Components/LastTransaction';

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      walletId: 1,
      wallet: {},
      errorWallet: '',
      errorTransaction: '',
      lastTransaction: []
    };
  }

  async componentDidMount() {
    await this._fetchWallet();
    await this._fetchLastTransaction();
    const elements = document.querySelectorAll('.carousel');
    const options = {
      duration: 1
    };
    M.Carousel.init(elements, options);
    M.AutoInit();
  }

  _fetchWallet = async () => {
    const { walletId } = this.state;
    const { API_URL } = this.props;
    try {
      const { data: wallet } = await axios.get(`${API_URL}/wallets/${walletId}`);
      this.setState({ wallet, errorWallet: '' });
    } catch (e) {
      this.setState({ errorWallet: e.message });
    }
  }

  _fetchLastTransaction = async () => {
    const { API_URL } = this.props;
    try {
      const { data: lastTransaction } = await axios.get(`${API_URL}/transactions?_sort=createdAt&_order=desc&_limit=5`);
      this.setState({
        lastTransaction, errorTransaction: ''
      });
    } catch (e) {
      this.setState({ errorTransaction: e.message });
    }
  }

  render() {
    const {
      wallet, errorWallet, lastTransaction, errorTransaction
    } = this.state;
    return (
      <div className="row">
        <div className="row" />
        {!errorWallet ? <Wallet wallet={wallet} /> : <WalletError message={errorWallet} />}
        <br />
        {!errorTransaction
          ? <LastTransaction transactions={lastTransaction} />
          : <TransactionError message={errorTransaction} />}
      </div>
    );
  }
}


DashboardContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};
export default DashboardContainer;
