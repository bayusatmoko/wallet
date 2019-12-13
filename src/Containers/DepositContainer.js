import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import TransactionForm from '../Components/TransactionForm';
import SuccessNotification from '../Components/SuccessNotification';
import FailedNotification from '../Components/FailedNotification';

class DepositContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      balance: 0,
      isSubmitted: false
    };
  }

  _addTransaction = async (newTransaction) => {
    const { API_URL } = this.props;
    try {
      console.log('sub');
      await axios.post(`${API_URL}/transactions`, newTransaction);
      const { data: wallet } = await axios.get(`${API_URL}/users/${1}/wallets/`);
      this.setState({ balance: wallet.balance, error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  _handleSubmit = async ({ nominal, description }) => {
    const walletId = 1;
    const newTransaction = {
      walletId,
      receiverWalletId: walletId,
      nominal,
      description,
      type: 'DEPOSIT'
    };
    this.setState({ isSubmitted: true });
    await this._addTransaction(newTransaction);
  };

  _renderNotification = () => {
    const { error, balance } = this.state;
    if (error) {
      return (<FailedNotification message={error} />);
    }
    return (<SuccessNotification balance={balance} />);
  };

  render() {
    const { isSubmitted } = this.state;
    return (
      <div className="row">
        <TransactionForm onSubmit={this._handleSubmit} />
        {isSubmitted && this._renderNotification()}
      </div>
    );
  }
}

DepositContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};
export default DepositContainer;
