import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import {
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import TransactionContainer from './Containers/TransactionContainer';
import DashboardContainer from './Containers/DashboardContainer';
import NoMatch from './Components/NoMatch';

class App extends React.PureComponent {
  render() {
    const API_URL = 'http://localhost:3333';
    return (
      <div className="App">
        <header>
          <nav className="blue">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <NavLink to="/" className="brand-logo right">E-Banking</NavLink>
          </nav>
          <ul id="nav-mobile" className="sidenav sidenav-fixed">
            <li>
              <div className="user-view">
                <div className="background">
                  <img src="assets/images/background-user.jpg" alt="user background" />
                </div>
                <img className="circle" src="assets/images/user-icon.png" alt="user icon" />
                <span className="name">Bill Gates</span>
                <span className="email">bill-gates@microsoft.com</span>
              </div>
            </li>
            <li>
              <NavLink exact to="/" activeClassName="active pulse">Dashboard</NavLink>
            </li>
            <li>
              <NavLink exact to="/transaction" activeClassName="active pulse">Transaction</NavLink>
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
