import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import TransactionItem from './TransactionItem';

class TransactionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateOrder: 'desc',
      nominalOrder: ''
    };
  }

  _handleSort = (sortColumn) => {
    const { onSort } = this.props;
    const { dateOrder, nominalOrder } = this.state;
    let updatedOrder;
    if (sortColumn === 'date') {
      updatedOrder = this._changeOrder(dateOrder);
      this.setState({ dateOrder: updatedOrder, nominalOrder: '' });
    }
    if (sortColumn === 'nominal') {
      updatedOrder = this._changeOrder(nominalOrder);
      this.setState({ nominalOrder: updatedOrder, dateOrder: '' });
    }
    onSort(sortColumn, updatedOrder);
  };

  _changeOrder = (orderBy) => {
    if (orderBy === 'desc') {
      return 'asc';
    }
    return 'desc';
  };

  _renderTableHeader = () => {
    const { dateOrder, nominalOrder } = this.state;
    return (
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
          <th className="clickableHeader" id="nominal-header" onClick={() => { this._handleSort('nominal'); }}>
            {'Nominal '}
            {nominalOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
            {nominalOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
          </th>
          <th className="clickableHeader" id="date-header" onClick={() => { this._handleSort('date'); }}>
            {'Date '}
            {dateOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
            {dateOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
          </th>
          <th>Receiver/Sender</th>
        </tr>
      </thead>
    );
  };

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
  transactions: PropTypes.arrayOf(PropTypes.object),
  walletId: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired
};

export default TransactionList;
