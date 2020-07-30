import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Admin_Users from './Admin_Users';
import Admin_Product from './Admin_Product';
import './Admin.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            page: ''
        };

        this.handleAdminNav = this.handleAdminNav.bind(this);
        console.log(this.props);
    }

    handleAdminNav(event) {
        this.setState({ page: event.target.id });
    }

    render() {
        const { page } = this.state;
        
        return(
            <div className="admin-page">
                <div className="float-left mg-5-top mg-2-left h-100">
                    <Nav defaultActiveKey="/" className="flex-column height-100" onClick={this.handleAdminNav}>
                        <Nav.Link id="home">Home</Nav.Link>
                        <Nav.Link id="users">Users</Nav.Link>
                        <Nav.Link id="products">Products</Nav.Link>
                        <Nav.Link id="orders">Orders</Nav.Link>       
                    </Nav>
                </div>
                <div className="float-right tab mg-5-top w-80 h-100">
                    <div className="inner-page">
                        {
                          (page === "" || page === "home") &&
                          <h2>
                              Please select a Page
                          </h2>  
                        }
                        {
                            page === "users" &&
                            <Admin_Users location={this.props.location}/>
                            
                        }
                        {
                            page === "products" &&
                            <Admin_Product />
                        }
                        {
                            page === "orders" &&
                            <h2>
                                order control
                            </h2>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);