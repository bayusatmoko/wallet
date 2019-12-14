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
      errorTransaction: '',
      sortColumn: 'date',
      orderBy: 'desc'
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

    _handleSort = (sortColumn, orderBy) => {
      this.setState({ sortColumn, orderBy });
    };

    _sortByDate = () => {
      const { transactions, orderBy } = this.state;
      return [...transactions].sort((a, b) => {
        if (orderBy === 'desc') {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        }
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      });
    };

    _sortTransactionsByDate = () => {
      const { sortColumn } = this.state;
      let sortedTransaction;
      if (sortColumn === 'date') {
        sortedTransaction = this._sortByDate();
      }
      return sortedTransaction;
    };


    render() {
      const { errorTransaction } = this.state;
      const sortedTransaction = this._sortTransactionsByDate();
      return (
        <div className="all-transaction">
          {!errorTransaction
            ? <TransactionList transactions={sortedTransaction} onSort={this._handleSort} />
            : <TransactionError message={errorTransaction} />}
        </div>
      );
    }
}

export default TransactionHistoryContainer;
