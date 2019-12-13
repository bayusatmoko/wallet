import React from 'react';
import PropTypes from 'prop-types';
import Balance from './Balance';

class Wallet extends React.PureComponent {
  render() {
    const { wallet } = this.props;
    return (
      <div className="row center dashboard__wallet">
        <div className="col s12 m8 offset-m2 ">
          <div className="card-content white-text dashboard__wallet--card">
            <h5 className="card-title dashboard__wallet--title">My Wallet</h5>
            <h5 className="card-title dashboard__wallet--id" id="wallet-id">{wallet.id}</h5>
            <Balance balance={wallet.balance} />
          </div>
        </div>
      </div>
    );
  }
}


Wallet.propTypes = {
  wallet: PropTypes.exact({
    id: PropTypes.number,
    balance: PropTypes.number,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired
};

export default Wallet;
