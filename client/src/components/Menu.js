import React from 'react';
import logo from '../logo.svg';
import { withRouter } from 'react-router-dom';
import './Menu.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Menu() {
    return (
        <div className="menuBar">         
            <nav>
                <li><a href="#">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#contact">Contact</a></li>
            </nav>

            <button className="btn-circle btn-login"><FontAwesomeIcon icon={faUser} size="2x"></FontAwesomeIcon></button>
        </div> 
    );
}

export default withRouter(Menu);