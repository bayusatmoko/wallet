import React from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

class TransactionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 'deposit',
      amount: '',
      description: '',
      walletId: 1
    };
  }

  componentDidMount() {
    const elements = document.querySelectorAll('select');
    M.FormSelect.init(elements, {});
    M.AutoInit();
  }

  _handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  _handleSubmit = () => {
    const { onSubmit } = this.props;
    const {
      walletId, type, amount, description
    } = this.state;
    if (amount < 0) {
      alert('Amount cannot be negative');
      return true;
    }
    const createdAt = new Date();
    onSubmit({
      walletId, type, amount, description, createdAt
    });
  };

  _renderTypeSelect = () => {
    const { type } = this.state;
    return (
      <div className="row">
        <br />
        <div className="input-field">
          <i className="material-icons prefix">account_balance_wallet</i>
          <select name="type" id="type-select" onChange={this._handleChange} value={type}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <label>Type of Transaction</label>
        </div>
      </div>
    );
  };

  _renderAmountInput = () => {
    const { amount } = this.state;
    return (
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">attach_money</i>
          <input className="input-field" type="number" id="amount-input" name="amount" onChange={this._handleChange} value={amount} min="0" />
          <label htmlFor="amount-input">Amount</label>
        </div>
      </div>
    );
  };

  _renderDescriptionInput = () => {
    const { description } = this.state;
    return (
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">mode_edit</i>
          <textarea className="materialize-textarea" id="description-input" name="description" onChange={this._handleChange} value={description} />
          <label htmlFor="description-input">Description</label>
        </div>
      </div>
    );
  };

  _renderSubmitButton = () => (
    <div className="row">
      <div className="input-field">
        <button className="btn waves-effect waves-light col l12 s12 m8 offset-m2" type="submit" id="submit-button" onClick={this._handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );

  render() {
    return (
      <div className="row transaction__form">
        <div className="col card l6 offset-l3 s12">
          <div className="card-content">
            <span className="card-title">Add Transaction</span>
            {this._renderTypeSelect()}
            {this._renderAmountInput()}
            {this._renderDescriptionInput()}
            {this._renderSubmitButton()}
          </div>
        </div>
      </div>
    );
  }
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
export default TransactionForm;
