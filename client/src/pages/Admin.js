import React from 'react';
import './Admin.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    render() {
        return(
            <h1>Admin page</h1>
        )
    }
}

export default Admin;