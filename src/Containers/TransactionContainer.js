import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import TransactionList from '../Components/TransactionList';
import TransactionSearch from '../Components/TransactionSearch';
import TransactionError from '../Components/TransactionError';
import TransactionSort from '../Components/TransactionSort';

class TransactionContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      search: '',
      error: ''
    };
  }

  async componentDidMount() {
    const { API_URL } = this.props;
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      this.setState({ transactions: response.data, error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  _handleSearch = (value) => {
    this.setState({
      search: value
    });
  };

  _handleSort = async (value) => {
    const { API_URL } = this.props;
    try {
      const response = await axios.get(`${API_URL}/transactions?${value}`);
      this.setState({ transactions: response.data, error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  _filter = () => {
    const { search, transactions } = this.state;
    let searchedTransactions = transactions.filter((transaction) => transaction.description
      .toLowerCase()
      .includes(search.toLowerCase())
    || transaction.amount.toString().includes(search));
    if (!searchedTransactions.length) searchedTransactions = transactions;
    return searchedTransactions;
  };

  render() {
    const { error } = this.state;
    return (
      <div className="row">
        <div className="row">
          <TransactionSort onSort={this._handleSort} />
          <TransactionSearch onSearch={this._handleSearch} />
        </div>
        {!error
          ? <TransactionList transactions={this._filter()} />
          : <TransactionError message={error} />}
      </div>
    );
  }
}


TransactionContainer.propTypes = {
  API_URL: PropTypes.string.isRequired
};
export default TransactionContainer;
