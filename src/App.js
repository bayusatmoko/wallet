import React from 'react';
import './App.css';
import { NavLink, Route, Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import phoenix from './assets/images/phoenix.png';
import NoMatch from './Components/NoMatch';
import DashboardContainer from './Containers/DashboardContainer';
import UserInfoContainer from './Containers/UserInfoContainer';
import DepositContainer from './Containers/DepositContainer';
import TransactionHistoryContainer from './Containers/TransactionHistoryContainer';
import TransferContainer from './Containers/TransferContainer';

class App extends React.PureComponent {
  _renderTitle = () => (
    <>
      <nav className="background-header">
        <a href="/#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <NavLink to="/" className="brand-logo right">
          <div className="logo-header">
            <h5 className="logo-name">PHOENIX WALLET</h5>
            <img className="image-phoenix" src={phoenix} alt="" />
          </div>
        </NavLink>
      </nav>
    </>
  );

  _renderSideNav = () => (
    <ul id="nav-mobile" className="sidenav sidenav-fixed">
      <UserInfoContainer />
      <li><NavLink exact to="/" activeClassName="active white-text">Dashboard</NavLink></li>
      <li><NavLink exact to="/transaction" activeClassName="active white-text">Transaction</NavLink></li>
      <li><NavLink exact to="/deposit" activeClassName="active white-text">Deposit</NavLink></li>
      <li><NavLink exact to="/transfer" activeClassName="active white-text">Transfer</NavLink></li>
    </ul>
  );

  _renderContent = () => {
    const API_URL = 'http://localhost:3000';
    return (
      <Switch>
        <Route exact path="/transaction"><TransactionHistoryContainer API_URL={API_URL} /></Route>
        <Route exact path="/deposit"><DepositContainer API_URL={API_URL} /></Route>
        <Route exact path="/"><DashboardContainer API_URL={API_URL} /></Route>
        <Route exact path="/transfer"><TransferContainer API_URL={API_URL} /></Route>
        <Route path="*"><NoMatch /></Route>
      </Switch>
    );
  };

  render() {
    return (
      <div className="App">
        <header>
          {this._renderTitle()}
          {this._renderSideNav()}
        </header>
        <main>
          <div className="container">
            {this._renderContent()}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
