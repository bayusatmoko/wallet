import React from 'react';
import PropTypes from 'prop-types';

const ReceiverItem = (props) => {
  const { receiver, onClick } = props;
  return (
    <div id="receiver-item" onClick={onClick} onKeyDown={onClick} role="button" tabIndex="0">
      <p id="name">{receiver.name}</p>
    </div>
  );
};

ReceiverItem.propTypes = {
  receiver: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ReceiverItem;
