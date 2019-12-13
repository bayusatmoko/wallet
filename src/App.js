import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import {
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import background from './assets/images/background.jpg';
import phoenix from './phoenix.png';
import TransactionContainer from './Containers/TransactionContainer';
import DashboardContainer from './Containers/DashboardContainer';
import NoMatch from './Components/NoMatch';
import UserInfoContainer from './Containers/UserInfoContainer';

class App extends React.PureComponent {
  render() {
    const API_URL = 'http://localhost:3000';
    return (
      <div className="App">
        <header>
          <nav className="background-header">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <NavLink to="/" className="brand-logo right">
              <div className="logo-header">
                <h5 className="logo-name">PHOENIX WALLET</h5>
                <img className="image-phoenix" src={phoenix} alt="" />
              </div>
            </NavLink>
          </nav>
          <ul id="nav-mobile" className="sidenav sidenav-fixed">
            <UserInfoContainer />
            <li>
              <NavLink exact to="/" activeClassName="active">Dashboard</NavLink>
            </li>
            <li>
              <NavLink exact to="/transaction" activeClassName="active">Transaction</NavLink>
            </li>
          </ul>
        </header>
        <main>
          <div className="container">
            <Switch>
              <Route exact path="/transaction">
                <TransactionContainer API_URL={API_URL} />
              </Route>
              <Route exact path="/">
                <DashboardContainer API_URL={API_URL} />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
