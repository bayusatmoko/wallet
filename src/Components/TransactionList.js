import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';
import LastTransaction from './LastTransaction';

class TransactionList extends React.PureComponent {
  _renderTableHeader = () => (
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
  );

  render() {
    const { transactions } = this.props;
    return (
      <table>
        {this._renderTableHeader()}
        <tbody className="transaction">
          {transactions.map((transaction, index) => (
            <TransactionItem transaction={transaction} key={transaction.id} index={index} />
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
