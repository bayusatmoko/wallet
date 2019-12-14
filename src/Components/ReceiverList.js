import React from 'react';
import PropTypes from 'prop-types';
import ReceiverItem from './ReceiverItem';

const ReceiverList = (props) => {
  const { receivers, onClick } = props;

  const _handleClick = (item) => () => {
    onClick(item);
  };

  const _renderReceivers = () => receivers.map((receiver) => (
    <ReceiverItem key={receiver.id} receiver={receiver} onClick={_handleClick(receiver)} />
  ));

  return (
    <table>
      <tbody>
        {_renderReceivers()}
      </tbody>
    </table>
  );
};

ReceiverList.propTypes = {
  receivers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ReceiverList;
