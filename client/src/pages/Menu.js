import React from "react";
import Login from './Login.js';
import { withRouter } from "react-router-dom";
import "./Menu.css";
import { Popover, OverlayTrigger } from 'react-bootstrap';
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
    this.props.history.push({
      pathname: '/' + event.target.id,
      state: this.props.location.state
    });
  }

  render() {
    const { loginOpen } = this.state;

    const openLogin = async () => {
      if (this.props.location.state) {
        var state = this.props.location.state;

        var requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Token": `${state.token}` },
        }
        const checkUser = await fetch('/api/users/admin/check', requestOptions);
        const json = await checkUser.json();

        if(json.message === "OK") {
          this.props.history.push({
            pathname: '/admin',
            state: {token: state.token, email: state.email}
          })
        } else {
          console.log('to profile page');                                    
        }
      } else {
        this.setState({ loginOpen: !this.state.loginOpen });
        
      }
    }

    const popover = (
      <Popover>
          <Popover.Title as="h3">Login</Popover.Title>
          <Popover.Content><Login /></Popover.Content>
        </Popover>
    )

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
          <OverlayTrigger
          className="btn-login-li"
          trigger="click"
          placement="bottom"
          show={loginOpen}
          overlay={popover}
          >
          <li className="btn-login-li">
            <button className="btn-circle btn-login" onClick={openLogin} id="loginButton">
              <FontAwesomeIcon icon={faUser} size="2x"></FontAwesomeIcon>
            </button>
          </li>
          </OverlayTrigger>
        </nav>
        
      </div>
    );
  }
  
}

export default withRouter(Menu);
