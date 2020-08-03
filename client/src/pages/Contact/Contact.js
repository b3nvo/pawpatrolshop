import React from 'react';
import {withRouter} from 'react-router-dom';
import './Contact.css';

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            body: ''
        };
    }

    render() {
        return (
            <div className="contact-page">
                <h1>Contact page</h1>
            </div>
        )
    }
}

export default withRouter(Contact);