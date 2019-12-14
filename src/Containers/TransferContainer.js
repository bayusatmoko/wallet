import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReceiverList from '../Components/ReceiverList';
import ReceiverSearch from '../Components/ReceiverSearch';
import TransactionForm from '../Components/TransactionForm';
import SuccessNotification from '../Components/SuccessNotification';
import FailedNotification from '../Components/FailedNotification';
import WalletError from '../Components/WalletError';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivers: [],
      selectedReceiver: {},
      errorTransaction: '',
      errorSearch: '',
      isSubmitted: false,
      balance: 0
    };
  }

  _handleSearch = async (query) => {
    const { API_URL } = this.props;
    try {
      const { data } = await axios.get(`${API_URL}/users?email=${query}`);
      this.setState({ receivers: [data], errorSearch: '' });
    } catch (error) {
      this.setState({ errorSearch: error.message });
    }
  };

  _handleSelectReceiver = (receiver) => {
    this.setState({ selectedReceiver: receiver });
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
    const { selectedReceiver } = this.state;
    const walletId = 1;
    const newTransaction = {
      walletId,
      receiverWalletId: selectedReceiver.wallet.id,
      nominal,
      description,
      type: 'TRANSFER'
    };
    this.setState({ isSubmitted: true });
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
      receivers, selectedReceiver, isSubmitted, errorSearch
    } = this.state;
    const { name, email } = selectedReceiver;
    return (
      <div>
        <ReceiverSearch onSubmit={this._handleSearch} />
        {errorSearch
          ? <WalletError message={errorSearch} />
          : <ReceiverList receivers={receivers} onClick={this._handleSelectReceiver} /> }
        {name
        && <TransactionForm onSubmit={this._handleSubmit} formTitle={`Transfer to ${name} (${email})`} />}
        {isSubmitted
        && this._renderNotification()}
      </div>
    );
  }
}

TransferContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};

export default TransferContainer;
