import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';

class TransactionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateOrder: 'desc'
    };
  }

  _handleSort = (sortColumn) => {
    const { onSort } = this.props;
    const { dateOrder } = this.state;
    const updatedDateOrder = this._changeOrder(dateOrder);
    onSort(sortColumn, updatedDateOrder);
    this.setState({ dateOrder: updatedDateOrder });
  };

  _changeOrder = (orderBy) => {
    if (orderBy === 'desc') {
      return 'asc';
    }
    return 'desc';
  }

  _renderTableHeader = () => (
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th>Amount</th>
        <th id="date-header" onClick={() => { this._handleSort('date'); }}>Date</th>
        <th>Receiver/Sender</th>
      </tr>
    </thead>
  );

  render() {
    const { transactions, walletId } = this.props;
    return (
      <table className="striped">
        {this._renderTableHeader()}
        <tbody className="transaction">
          {transactions.map((transaction, index) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              index={index}
              walletId={walletId}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

TransactionList.defaultProps = {
  transactions: []
};
TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object)
};

export default TransactionList;
