import React from 'react';
import PropTypes from 'prop-types';

class TransactionError extends React.PureComponent {
  render() {
    const { message } = this.props;
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3 center">
          <div className="card-panel red">
            <p className="white-text flow-text">{message}</p>
          </div>
        </div>
      </div>
    );
  }
}

TransactionError.propTypes = {
  message: PropTypes.string.isRequired
};
export default TransactionError;
