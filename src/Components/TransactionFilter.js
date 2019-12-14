import React from 'react';
import PropTypes from 'prop-types';

class TransactionFilter extends React.PureComponent {
    _handleDescription = (event) => {
      const { value } = event.target;
      const { handleDescription } = this.props;
      handleDescription(value);
    };

    _handleAmount = (event) => {
      const { value } = event.target;
      const { handleAmount } = this.props;
      handleAmount(value);
    };

    render() {
      return (
        <div className="filter-section">
          <div className="input-field col l4 m6 s12">
            <i className="material-icons prefix">search</i>
            <input type="text" id="search-input" className="input-field" onChange={this._handleDescription} placeholder="Search By Description" />
          </div>
          <div className="input-field col l4 m6 s12">
            <i className="material-icons prefix">search</i>
            <input type="number" id="search-input" className="input-field" onChange={this._handleAmount} placeholder="Search By Amount" />
          </div>
        </div>
      );
    }
}

TransactionFilter.propTypes = {
  handleDescription: PropTypes.func.isRequired,
  handleAmount: PropTypes.func.isRequired
};

export default TransactionFilter;
