import React from "react";
import Login from './Login.js';
import { withRouter } from "react-router-dom";
import "./Menu.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate(event) {
    console.log('navigating to : ' + event.target.id);
    this.props.history.push('/' + event.target.id);
  }

  render() {
    const { loginOpen } = this.state;
    const openLogin = () => {
      if (this.props.location.state) {
        var state = this.props.location.state;

        if (state.payload.access === 1) {
          console.log('to admin page');
          this.props.history.push({
            pathname: '/admin',
            state: {payload: state.payload, token: state.token}
          });
        } else {
          console.log('to profile page')
        }
      } else {
        this.setState({ loginOpen: !this.state.loginOpen });
      }
    }

    return (
      <div className="menuBar">
        <nav className="navMenu">
          <li className="nav-left">
              <a href="#home">PawPatrolShop</a>
          </li>
          <li>
            <a className="nav-item" onClick={this.navigate} id="home">
              Home
            </a>
          </li>
          <li>
            <a className="nav-item" onClick={this.navigate} id="products">
              Products
            </a>
          </li>
          <li>
            <a className="nav-item" onClick={this.navigate} id="contact">
              Contact
            </a>
          </li>
          <li className="btn-login-li">
            <a href="#login" className="desktop-hidden nav-item" onClick={ openLogin }>
              Login
            </a>
            <button className="btn-circle btn-login" onClick={openLogin}>
              <FontAwesomeIcon icon={faUser} size="2x"></FontAwesomeIcon>
            </button>
          </li>
        </nav>
        { loginOpen
        ? <div className="loginDropDown"><Login /></div>
        : <div></div>
        }
      </div>
    );
  }
  
}

export default withRouter(Menu);
