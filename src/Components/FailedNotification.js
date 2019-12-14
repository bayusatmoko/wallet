import React from 'react';
import PropTypes from 'prop-types';

const FailedNotification = (props) => {
  const { message } = props;
  return (
    <div className="row notification__failed">
      <div className="col s12 m6 offset-m3 center">
        <div className="card-panel red">
          <p className="white-text flow-text">Transaction failed! Please try again in a few minutes.</p>
          <p id="failed-message" className="white-text flow-text">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

FailedNotification.propTypes = {
  message: PropTypes.string.isRequired
};

export default FailedNotification;
