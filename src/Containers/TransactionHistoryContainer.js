import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import TransactionList from '../Components/TransactionList';
import TransactionError from '../Components/TransactionError';
import config from '../config';
import TransactionFilter from '../Components/TransactionFilter';

class TransactionHistoryContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      errorTransaction: '',
      sortColumn: 'date',
      orderBy: 'desc',
      walletId: 1,
      searchDescription: '',
      searchAmount: ''
    };
  }

  async componentDidMount() {
    await this._fetchAllTransactions();
  }

    _fetchAllTransactions = async () => {
      const walletId = 1;
      try {
        const response = await axios.get(`${config.API_URL}/wallets/${walletId}/transactions`);
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

  _sortByNominal = () => {
    const { transactions, orderBy } = this.state;
    return [...transactions].sort((a, b) => {
      if (orderBy === 'desc') {
        return b.nominal - a.nominal;
      }
      return a.nominal - b.nominal;
    });
  };

    _sortTransactions = () => {
      const { sortColumn } = this.state;
      let sortedTransaction;
      if (sortColumn === 'date') {
        sortedTransaction = this._sortByDate();
      }
      if (sortColumn === 'nominal') {
        sortedTransaction = this._sortByNominal();
      }
      return sortedTransaction;
    };

    _displayTransaction = (transactions) => {
      const sortedDescription = this._sortTransactions(transactions);
      const filteredDescription = this._filterByDescription(sortedDescription);
      return this._filterByAmount(filteredDescription);
    };

    _handleDescription = (newDescription) => {
      this.setState({
        searchDescription: newDescription
      });
    };

  _handleAmount = (newAmount) => {
    this.setState({
      searchAmount: newAmount
    });
  };

  _filterByAmount(list) {
    const { searchAmount } = this.state;
    return list
      .filter((transaction) => transaction.nominal.toString().includes(searchAmount));
  }

  _filterByDescription(list) {
    const { searchDescription } = this.state;
    return list
      .filter((transaction) => transaction.description.includes(searchDescription));
  }


  render() {
    const { errorTransaction, transactions, walletId } = this.state;
    return (
      <div>
        <TransactionFilter
          handleDescription={this._handleDescription}
          handleAmount={this._handleAmount}
        />
        <div className="all-transaction">
          {!errorTransaction
            ? (
              <TransactionList
                transactions={this._displayTransaction(transactions)}
                walletId={walletId}
                onSort={this._handleSort}
              />
            )
            : <TransactionError message={errorTransaction} />}
        </div>
      </div>
    );
  }
}

export default TransactionHistoryContainer;
