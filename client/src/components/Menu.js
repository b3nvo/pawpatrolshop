import React from "react";
import logo from "../logo.svg";
import { withRouter } from "react-router-dom";
import "./Menu.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Menu() {
  return (
    <div className="menuBar">
      <nav className="navMenu">
        <li className="nav-left">
            <a href="#home">PawPatrolShop</a>
        </li>
        <li>
          <a href="#" className="nav-item">
            Home
          </a>
        </li>
        <li>
          <a href="#products" className="nav-item">
            Products
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-item">
            Contact
          </a>
        </li>
        <li className="btn-login-li">
          <a href="#login" className="desktop-hidden nav-item">
            Login
          </a>
          <button className="btn-circle btn-login">
            <FontAwesomeIcon icon={faUser} size="2x"></FontAwesomeIcon>
          </button>
        </li>
      </nav>
    </div>
  );
}

export default withRouter(Menu);
