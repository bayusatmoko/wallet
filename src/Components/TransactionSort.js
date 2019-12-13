import React from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

class TransactionSort extends React.PureComponent {
  componentDidMount() {
    const elements = document.querySelectorAll('select');
    M.FormSelect.init(elements, {});
    M.AutoInit();
  }

  _handleSort = (event) => {
    const { value } = event.target;
    const { onSort } = this.props;
    onSort(value);
  };

  render() {
    return (
      <div className="input-field col l4 m6 s12">
        <i className="material-icons prefix">sort</i>
        <select name="type" id="sort-select" onChange={this._handleSort}>
          <option value="_sort=createdAt&_order=asc">Oldest to Newest</option>
          <option value="_sort=createdAt&_order=desc">Newest to Oldest</option>
          <option value="_sort=amount&_order=asc">Amount (Low to High)</option>
          <option value="_sort=amount&_order=desc">Amount (High to Low)</option>
        </select>
      </div>
    );
  }
}

TransactionSort.propTypes = {
  onSort: PropTypes.func.isRequired
};

export default TransactionSort;
