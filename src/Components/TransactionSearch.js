import React from 'react';
import PropTypes from 'prop-types';

class TransactionSearch extends React.PureComponent {
  _handleSearch = (event) => {
    const { value } = event.target;
    const { onSearch } = this.props;
    onSearch(value);
  };

  render() {
    return (
      <div className="input-field col l4 offset-l4 m6 s12">
        <i className="material-icons prefix">search</i>
        <input type="text" id="search-input" className="input-field" onChange={this._handleSearch} placeholder="Search" />
      </div>
    );
  }
}
TransactionSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default TransactionSearch;
