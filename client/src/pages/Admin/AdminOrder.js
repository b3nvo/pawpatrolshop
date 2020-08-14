import React from 'react';
import './AdminOrder.css';
import Table from "react-bootstrap/Table";
import { faEdit, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class AdminOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            orders: [],
            modalPage: "",
            selectedOrder: "",
            result: "",
            showModal: false
        }

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setResult = this.setResult.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData() {
        var state = this.props.location.state;

        try {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", Token: `${state.token}`}
            }

            const response = await fetch("/api/orders", requestOptions);
            const json = await response.json();

            this.setState({ orders: json.data })
        } catch (err) {
            console.log(err);
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }

    setResult(value) {
        this.setState({ result: value });
    }

    handleOnClick(event) {
        const order = event.currentTarget.getAttribute("data-id");
        const page = event.currentTarget.getAttribute("data-page");

        console.log('order', order);
        console.log('modal', page);

        this.setState({ modalPage: page});
        this.setState({ selectedOrder: order});
    }

    async handleChange(e) {
        await this.handleOnClick(e);

        const { selectedOrder, modalPage } = this.state;

        if (selectedOrder === null || modalPage === null) {
            console.log(this.state)
        } else {
            this.setState({ showModal: true});
        }
    }

    handleHide() {
        this.setState({ showModal: false});
        this.setState({ selectedOrder: ""});
        this.setState({ modalPage: ""});

        if (this.state.result === "") {
            this.setState({ products: []});
            this.fetchData();
        }
    }

    render() {
        const { orders, modalPage, selectedOrder, showModal, result } = this.state;
        console.log('orders', orders);

        return (
            <div className="admin-table">
                <div className="result">{result !== "" ? <p>{result}</p> : null}</div>
                <Table striped hover className="table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>User</th>
                            <th>Address</th>
                            <th>Zipcode</th>
                            <th>Products</th>
                            <th>Total price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((el) => (
                            <tr key={el._id}>
                                <td>{el.status}</td>
                                <td>{el.user.firstName} {el.user.lastName}</td>
                                <td>{el.user.address[0].address}</td>
                                <td>{el.user.address[0].zipCode}</td>
                                <td><ul>{el.order_product.product.map((product) => (
                                    <li>{product.name} - € {`${product.price.$numberDecimal}`}</li>
                                ))}</ul></td>
                                <td></td>
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
            </div>
        )
    }
}