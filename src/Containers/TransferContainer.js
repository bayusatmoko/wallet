import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReceiverList from '../Components/ReceiverList';
import ReceiverSearch from '../Components/ReceiverSearch';
import TransactionForm from '../Components/TransactionForm';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivers: [],
      selectedReceiver: { name: '' }
    };
  }

  _handleSearch = async (query) => {
    const { API_URL } = this.props;
    const { data } = await axios.get(`${API_URL}/users?q=${query}`);
    this.setState({ receivers: data });
  };

  _handleSelectReceiver = (receiver) => {
    this.setState({ selectedReceiver: receiver });
  };

  _addTransaction = async (newTransaction) => {
    const { API_URL } = this.props;
    try {
      await axios.post(`${API_URL}/transactions`, newTransaction);
    } catch (error) {
      console.log(error);
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
    await this._addTransaction(newTransaction);
  };

  render() {
    const { receivers, selectedReceiver } = this.state;
    return (
      <div>
        <ReceiverSearch onSubmit={this._handleSearch} />
        <ReceiverList receivers={receivers} onClick={this._handleSelectReceiver} />
        <p id="receiver-selected">{selectedReceiver.name}</p>
        <TransactionForm onSubmit={this._handleSubmit} />
      </div>
    );
  }
}

TransferContainer.propTypes = {

};

export default TransferContainer;
