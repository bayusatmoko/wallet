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
      error: ''
    };
  }

  _addTransaction = async (transaction) => {
    const { API_URL } = this.props;
    try {
      await axios.post(`${API_URL}/transactions`, transaction);
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
    await this._addTransaction(newTransaction);
  };

  render() {
    const { error } = this.state;
    return (
      <div className="row">
        <TransactionForm onSubmit={this._handleSubmit} />
        {!error
          ? <SuccessNotification balance={}/>
          : <FailedNotification message={error} />}
      </div>
    );
  }
}


DepositContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};
export default DepositContainer;
