import React from 'react';
import Login from './components/Login';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
    </Router>
  );
}

function Start() {
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          PawPatrolShop in-progress
        </p>
        <Login />
      </header>
    </div>
  )
}

export default App;
