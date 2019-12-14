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

  _renderSearchInput = () => {
    const { query } = this.state;
    return (
      <div className="input-field">
        <i className="material-icons prefix">search</i>
        <input className="input-field" type="text" id="search-input" name="search-input" onChange={this._handleChange} value={query} />
        <label htmlFor="search-input">Search by email or phone number</label>
      </div>
    );
  };

  _renderSubmitButton = () => (
    <div className="input-field">
      <button className="btn waves-effect waves-light col l12 s12 m8 offset-m2" type="submit" id="submit-button" onClick={this._handleSubmit}>
          OK
      </button>
    </div>
  );

  render() {
    return (
      <div className="row">
        {this._renderSearchInput()}
        {this._renderSubmitButton()}
      </div>
    );
  }
}

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
