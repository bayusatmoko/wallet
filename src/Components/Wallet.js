import React from 'react';
import PropTypes from 'prop-types';
import Balance from './Balance';

class Wallet extends React.PureComponent {
  render() {
    const { wallet, user } = this.props;
    return (
      <div className="row center dashboard__wallet">
        <div className="col s12 m8 offset-m2 ">
          <div className="card-content white-text dashboard__wallet--card">
            <div className="wallet-greeting">
              <h2>
                {`Hi, ${user.name}`}
              </h2>
              <span className="id-wallet" id="wallet-id">
                {`(ID : ${wallet.id})`}
              </span>
            </div>
            <h5>Your Balance: </h5>
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
