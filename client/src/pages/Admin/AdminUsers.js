import React from "react";
import { Table } from "react-bootstrap";
import AdminUsersModal from "./AdminUserModal";
import "./AdminUsers.css";
import { faEdit, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            admin: {},
            modalPage: "",
            selectedUser: "",
            error: "",
            showModal: false
        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setError = this.setError.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData() {
        var state = this.props.location.state;

        if (state.payload.access === 1) {
            try {
                const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json", Token: `${state.token}` }
                };
                const response = await fetch("/api/users", requestOptions);
                const json = await response.json();

                this.setState({ users: json.data, admin: state.payload });
            } catch (err) {
                console.log(err);
            }
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }

    setError(value) {
        this.setState({ error: value });
    }

    handleOnClick(event) {
        const user = event.currentTarget.getAttribute("data-id");
        const page = event.currentTarget.getAttribute("data-page");

        console.log("userId", user);
        console.log("modalPage", page);

        this.setState({ modalPage: page });
        this.setState({ selectedUser: user });
    }

    async handleChange(e) {
        await this.handleOnClick(e);

        const { selectedUser, modalPage } = this.state;

        if (selectedUser === null || modalPage === null) {
            console.log(this.state);
        } else {
            this.setState({ showModal: true });
        }
    }

    handleHide() {
        this.setState({ showModal: false });
        this.setState({ selectedUser: "" });
        this.setState({ modalPage: "" });

        if (this.state.error === "") {
            this.setState({ users: [] });
            this.fetchData();
        }
    }

    render() {
        const { users, admin, modalPage, selectedUser, showModal } = this.state;
        console.log("users", users);

        return (
            <div className="admin-table">
                <Table striped hover className="table">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Zipcode</th>
                            <th>Address</th>
                            {admin.access === 1 ? <th>access</th> : <th></th>}
                            <th className="mg-1">
                                <button className="btn-new" id="btn-new">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((el) => (
                            <tr key={el._id}>
                                <td>{el.firstName}</td>
                                <td>{el.lastName}</td>
                                <td>{el.email}</td>
                                <td>{el.countryId.name}</td>
                                <td>{el.address[0].zipCode}</td>
                                <td>{el.address[0].address}</td>
                                {admin.access === 1 ? <td>{el.access}</td> : <td></td>}
                                <td className="actions">
                                    <button
                                        className="btn-edit"
                                        onClick={this.handleChange}
                                        data-page="btn-edit"
                                        data-id={el._id}
                                    >
                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={this.handleChange}
                                        data-page="btn-delete"
                                        data-id={el._id}
                                    >
                                        <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <AdminUsersModal
                    state={this.props.location.state}
                    setError={this.setError}
                    handleHide={this.handleHide}
                    user={selectedUser}
                    modalPage={modalPage}
                    showModal={showModal}
                />
            </div>
        );
    }
}

export default AdminUsers;
