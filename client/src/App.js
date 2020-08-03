import React from 'react';
import Login from './pages/Login.js';
import Register from './pages/Register/Register.js';
import Admin from './pages/Admin/Admin';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products'
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import logo from './logo.svg';
import Menu from './pages/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Menu />
          <Home />
        </Route>
        <Route exact path="/register">
          <Menu />
          <Register />
        </Route>
        <Route exact path="/admin">
          <Menu />
          <Admin />
        </Route>
        <Route exact path="/products">
          <Menu />
          <Products />
        </Route>
        <Route path="/product/:productId">
          <Menu />
          <Product />
        </Route>
        <Route exact path="/profile">
          <Menu />
          <Profile />
        </Route>
        <Route exact path="/contact">
          <Menu />
          <Contact /> 
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
