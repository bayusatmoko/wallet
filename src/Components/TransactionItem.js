import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../utils/formatCurrency';
import formatDate from '../utils/formatDate';

class TransactionItem extends React.PureComponent {
  render() {
    const { transaction } = this.props;
    return (
      <tr className="transaction__item" key={transaction.id}>
        <td>{transaction.type}</td>
        <td>{transaction.description}</td>
        <td>{formatCurrency(transaction.nominal)}</td>
        <td>{formatDate(transaction.createdAt)}</td>
        <td>{transaction.receiver.user.name}</td>
      </tr>
    );
  }
}
TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};
export default TransactionItem;
