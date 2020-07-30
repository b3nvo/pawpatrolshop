import React from 'react';
import { Table } from 'react-bootstrap';
import './Admin_Users.css';
import { faEdit, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Admin_Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            admin: {}
        }
    }

    async componentDidMount() {
        var state = this.props.location.state;

        
        if (state.payload.access === 1) {
            try {
                const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Token": `${state.token}` } 
                };
                const response = await fetch('/api/users', requestOptions);
                const json = await response.json();

                this.setState( { users: json.data, admin: state.payload })

            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        const { users, admin } = this.state;
        console.log('users', users); 

        return (
            <Table striped bordered hover size="sm" className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Zipcode</th>
                        <th>Address</th>
                        { admin.access === 1 ? <th>access</th> : <th></th>}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(el => (
                        <tr>
                            <td>{el._id}</td>
                            <td>{el.firstName}</td>
                            <td>{el.lastName}</td>
                            <td>{el.email}</td>
                            <td>{el.countryId.name}</td>
                            <td>{el.address[0].zipCode}</td>
                            <td>{el.address[0].address}</td>
                           { admin.access === 1 ? <td>{el.access}</td> : <td></td>}
                            <td>
                                <button className="btn-login" >
                                    <FontAwesomeIcon icon={faBan} size="2x"></FontAwesomeIcon>
                                </button>
                                <button className="btn-login" >
                                    <FontAwesomeIcon icon={faEdit} size="2x"></FontAwesomeIcon>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default Admin_Users;