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
  }).isRequired
};

export default TransactionItem;
