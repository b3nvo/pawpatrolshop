import React from 'react';
import Login from '/pages/Login';
import Admin from '/pages/Admin';
import Register from '/pages/Register';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/admin" >
          <Admin />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
    </Router>
  );
}

function Start({history}) {
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          PawPatrolShop in-progress
        </p>
        <Login history={history} />
      </header>
    </div>
  )
}

export default App;
