import React from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

class TransactionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nominal: '',
      description: ''
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

  _checkAmountInput = (nominal) => {
    if (nominal < 0) {
      alert('Amount cannot be negative');
      return false;
    }
    return true;
  };

  _handleSubmit = () => {
    const { onSubmit } = this.props;
    const { nominal, description } = this.state;
    if (this._checkAmountInput(nominal)) {
      onSubmit({ nominal, description });
    }
  };

  _renderAmountInput = () => {
    const { nominal } = this.state;
    return (
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">attach_money</i>
          <input className="input-field" type="number" id="nominal-input" name="nominal" onChange={this._handleChange} value={nominal} min="0" />
          <label htmlFor="nominal-input">Amount</label>
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
          OK
        </button>
      </div>
    </div>
  );

  render() {
    const { formTitle } = this.props;
    return (
      <div className="row transaction__form">
        <div className="col card l6 offset-l3 s12">
          <div className="card-content">
            <span className="card-title">{formTitle}</span>
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
  onSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired
};
export default TransactionForm;
