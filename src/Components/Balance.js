import React from 'react';
import Intl from 'intl';
import PropTypes from 'prop-types';
import locale from 'intl/locale-data/jsonp/id-ID';

class Balance extends React.PureComponent {
    _formatCurrency = (amount) => new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);

    render() {
      const { balance } = this.props;
      return (
        <h4 id="balance" className="balance">
          {this._formatCurrency(balance)}
        </h4>
      );
    }
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired
};

export default Balance;
