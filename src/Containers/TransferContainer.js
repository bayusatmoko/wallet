import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReceiverSearch from '../Components/ReceiverSearch';
import TransactionForm from '../Components/TransactionForm';
import SuccessNotification from '../Components/SuccessNotification';
import FailedNotification from '../Components/FailedNotification';
import WalletError from '../Components/WalletError';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivers: [{ name: '', email: '' }],
      errorTransaction: '',
      errorSearch: '',
      isSubmitted: false,
      isSearched: false,
      balance: 0
    };
  }

  _handleSearch = async (query) => {
    const { API_URL } = this.props;
    try {
      const { data } = await axios.get(`${API_URL}/users?email=${query}`);
      this.setState({
        receivers: [data], errorSearch: '', isSearched: true, isSubmitted: false
      });
    } catch (error) {
      this.setState({ errorSearch: error.message });
    }
  };

  _addTransaction = async (newTransaction) => {
    const USER_ID = 1;
    const { API_URL } = this.props;
    try {
      await axios.post(`${API_URL}/transactions`, newTransaction);
      const { data: wallet } = await axios.get(`${API_URL}/users/${USER_ID}/wallets`);
      this.setState({ balance: wallet.balance, errorTransaction: '' });
    } catch (error) {
      this.setState({ errorTransaction: error.message });
    }
  };

  _handleSubmit = async ({ nominal, description }) => {
    const { receivers } = this.state;
    const [{ wallet }] = receivers;
    const walletId = 1;
    const newTransaction = {
      walletId,
      receiverWalletId: wallet.id,
      nominal,
      description,
      type: 'TRANSFER'
    };
    this.setState({ isSubmitted: true, isSearched: false });
    await this._addTransaction(newTransaction);
  };

  _renderNotification = () => {
    const { errorTransaction, balance } = this.state;
    if (errorTransaction) {
      return (<FailedNotification message={errorTransaction} />);
    }
    return (<SuccessNotification balance={balance} />);
  };

  render() {
    const {
      receivers, isSubmitted, isSearched, errorSearch
    } = this.state;
    const [{ name, email }] = receivers;
    return (
      <div>
        {!isSearched && <ReceiverSearch onSubmit={this._handleSearch} /> }
        {errorSearch && <WalletError message={errorSearch} /> }
        {isSearched && <TransactionForm onSubmit={this._handleSubmit} formTitle={`Transfer to ${name} (${email})`} /> }
        {isSubmitted && this._renderNotification()}
      </div>
    );
  }
}

TransferContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};

export default TransferContainer;
