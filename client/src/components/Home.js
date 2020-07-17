import React, {useState} from 'react';
import { Button, Form } from "react-bootstrap";
import Menu from './Menu';
import {withRouter} from "react-router-dom";
import './Home.css';

function Home() {

    return(
        <div className="home">
            <div className="Menu">
                <Menu />
            </div>

            <h1>Hello, PawPatrolShop in-progress</h1>
        </div>
        
    )
}

export default withRouter(Home);