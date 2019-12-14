import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import formatCurrency from '../utils/formatCurrency';
import styleConstant from '../styleConstant';

class TransactionItem extends React.PureComponent {
  _setNominalColor = (transaction, walletId) => {
    if (transaction.type === TransactionItem.TYPE.DEPOSIT
      || transaction.receiverWalletId === walletId) {
      return styleConstant.fontColor.DEPOSIT;
    }
    return styleConstant.fontColor.TRANSFER;
  };

  _renderSenderReceiver = (transaction, walletId) => {
    if (transaction.type === TransactionItem.TYPE.DEPOSIT) {
      return '';
    }
    if (transaction.receiverWalletId === walletId) {
      return `From ${transaction.sender.user.name}`;
    }
    return `To ${transaction.receiver.user.name}`;
  };

  render() {
    const { transaction, walletId } = this.props;
    return (
      <tr className="transaction__item" key={transaction.id}>
        <td>{transaction.type}</td>
        <td>{transaction.description}</td>
        <td className={this._setNominalColor(transaction, walletId)}>
          {formatCurrency(transaction.nominal)}
        </td>
        <td>{moment(transaction.createdAt).format('DD MMMM YYYY hh:mm:ss')}</td>
        <td>
          {this._renderSenderReceiver(transaction, walletId)}
        </td>
      </tr>
    );
  }
}
TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    nominal: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  walletId: PropTypes.number.isRequired
};

TransactionItem.TYPE = {
  DEPOSIT: 'DEPOSIT',
  TRANSFER: 'TRANSFER'
};

export default TransactionItem;
