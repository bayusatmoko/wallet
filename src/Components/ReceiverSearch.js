import React from 'react';
import PropTypes from 'prop-types';

const ReceiverSearch = (props) => {
  const { onChange } = props;

  const _handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <input id="search" onChange={_handleChange} />
  );
};

ReceiverSearch.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ReceiverSearch;
