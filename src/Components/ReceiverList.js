import React from 'react';
import PropTypes from 'prop-types';
import ReceiverItem from './ReceiverItem';

const ReceiverList = (props) => {
  const { receivers, onClick } = props;

  const _handleClick = (item) => () => {
    onClick(item);
  };

  const _renderReceiverItem = () => receivers.map((item) => (
    <ReceiverItem key={item.id} receiver={item} onClick={_handleClick(item)} />
  ));

  return (
    <table>
      <tbody>
        {_renderReceiverItem()}
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
