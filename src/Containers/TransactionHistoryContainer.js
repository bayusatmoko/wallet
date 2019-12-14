import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import TransactionList from '../Components/TransactionList';
import TransactionError from '../Components/TransactionError';

class TransactionHistoryContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      errorTransaction: ''
    };
  }

  async componentDidMount() {
    await this._fetchAllTransactions();
  }

    _fetchAllTransactions = async () => {
      const walletId = 1;
      const { API_URL } = this.props;
      try {
        const response = await axios.get(`${API_URL}/wallets/${walletId}/transactions`);
        this.setState({ transactions: response.data, errorTransaction: '' });
      } catch (e) {
        this.setState({ errorTransaction: e.message });
      }
    };

    render() {
      const { transactions, errorTransaction } = this.state;
      return (
        <div className="all-transaction">
          {!errorTransaction
            ? <TransactionList transactions={transactions} />
            : <TransactionError message={errorTransaction} />}
        </div>
      );
    }
}

export default TransactionHistoryContainer;
