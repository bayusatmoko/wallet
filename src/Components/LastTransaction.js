import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../utils/formatCurrency';
import formatDate from '../utils/formatDate';

class LastTransaction extends React.PureComponent {
  _renderCard = (transaction, index) => (
    <a className="carousel-item" href={`#card${index}`} key={transaction.id}>
      <div className="left last-transaction__card">
        <div className="card-title text-bold">
          <h5>{formatCurrency(transaction.amount)}</h5>
        </div>
        <div className="divider" />
        <div className="card-action">
          <span>{transaction.description}</span>
          <p>{formatDate(transaction.createdAt)}</p>
        </div>
      </div>
    </a>
  );

  render() {
    const { transactions } = this.props;
    return (
      <div className="row">
        <h5 className="center">Last Transactions</h5>
        <div className="carousel">
          {transactions.map((transaction, index) => (
            this._renderCard(transaction, index)
          ))}
        </div>
      </div>
    );
  }
}

LastTransaction.defaultProps = {
  transactions: []
};

LastTransaction.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }))

};
export default LastTransaction;
