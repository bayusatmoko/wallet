import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../utils/formatCurrency';
import formatDate from '../utils/formatDate';

class TransactionItem extends React.PureComponent {
  _renderNominal = (transaction, walletId) => (
    <td className={transaction.type === 'DEPOSIT' || transaction.receiverWalletId === walletId
      ? 'green-text'
      : 'red-text'}
    >
      {formatCurrency(transaction.nominal)}
    </td>
  )

  _renderSenderReceiver = (transaction, walletId) => (
    <td>
      {transaction.receiverWalletId === walletId
        ? `From ${transaction.sender.user.name}`
        : `To ${transaction.receiver.user.name}`}
    </td>
  )

  render() {
    const { transaction, walletId } = this.props;
    return (
      <tr className="transaction__item" key={transaction.id}>
        <td>{transaction.type}</td>
        <td>{transaction.description}</td>
        {this._renderNominal(transaction, walletId)}
        <td>{formatDate(transaction.createdAt)}</td>
        {this._renderSenderReceiver(transaction, walletId)}
      </tr>
    );
  }
}
TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    nominal: PropTypes.number.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};
export default TransactionItem;
