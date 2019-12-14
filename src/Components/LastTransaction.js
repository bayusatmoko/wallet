import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';

class LastTransaction extends React.PureComponent {
  _renderTableHeader = () => (
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th>Nominal</th>
        <th className="date-head">Date</th>
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

LastTransaction.defaultProps = {
  transactions: []
};
LastTransaction.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  walletId: PropTypes.number.isRequired
};

export default LastTransaction;
