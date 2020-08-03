import React from 'react';
import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    render() {
        return (
            <div className="profile-page">
                <h1>Profile page</h1>
            </div>
        )
    }
}

export default Profile;