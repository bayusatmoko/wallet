import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReceiverSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  _handleChange = (event) => {
    const { value } = event.target;
    this.setState({ query: value });
  };

  _handleSubmit = () => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    onSubmit(query);
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <input id="search" onChange={this._handleChange} value={query} />
        <button type="submit" id="button" onClick={this._handleSubmit}>Search</button>
      </>
    );
  }
}

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
