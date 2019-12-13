import React from 'react';
import PropTypes from 'prop-types';
import Balance from './Balance';

const SuccessNotification = (props) => {
  const { balance } = props;
  return (
    <div className="row">
      <div className="col s12 m6 offset-m3 center">
        <div className="card-panel green">
          <p className="white-text flow-text">Transaction success!</p>
          <p id="new-balance" className="white-text flow-text">
            Current balance:
            <Balance balance={balance} />
          </p>
        </div>
      </div>
    </div>
  );
};

SuccessNotification.propTypes = {
  balance: PropTypes.number.isRequired
};

export default SuccessNotification;
