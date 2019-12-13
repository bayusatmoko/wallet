import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReceiverList from '../Components/ReceiverList';
import ReceiverSearch from '../Components/ReceiverSearch';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivers: [],
      selectedReceiver: { name: '' }
    };
  }

  _handleSearch = async (query) => {
    const { API_URL } = this.props;
    const { data } = await axios.get(`${API_URL}/users?q=${query}`);
    this.setState({ receivers: data });
  };

  _handleSelectReceiver = (receiver) => {
    this.setState({ selectedReceiver: receiver });
  };

  render() {
    const { receivers, selectedReceiver } = this.state;
    return (
      <div>
        <ReceiverSearch onSubmit={this._handleSearch} />
        <ReceiverList receivers={receivers} onClick={this._handleSelectReceiver} />
        <p id="receiver-selected">{selectedReceiver.name}</p>
      </div>
    );
  }
}

TransferContainer.propTypes = {

};

export default TransferContainer;
