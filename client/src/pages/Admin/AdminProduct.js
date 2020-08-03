import React from "react";
import "./AdminProduct.css";
import Table from "react-bootstrap/Table";
import AdminProductModal from "./AdminProductModal";
import { faEdit, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdminProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            admin: {},
            modalPage: "",
            selectedProduct: "",
            result: "",
            showModal: false
        };

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
                headers: { "Content-Type": "application/json", Token: `${state.token}` }
            };
            const response = await fetch("/api/products", requestOptions);
            const json = await response.json();

            this.setState({ products: json.data, admin: state.payload });
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
        const product = event.currentTarget.getAttribute("data-id");
        const page = event.currentTarget.getAttribute("data-page");

        console.log("product", product);
        console.log("modalPage", page);

        this.setState({ modalPage: page });
        this.setState({ selectedProduct: product });
    }

    async handleChange(e) {
        await this.handleOnClick(e);

        const { selectedProduct, modalPage } = this.state;

        if (selectedProduct === null || modalPage === null) {
            console.log(this.state);
        } else {
            this.setState({ showModal: true });
        }
    }

    handleHide() {
        this.setState({ showModal: false });
        this.setState({ selectedProduct: "" });
        this.setState({ modalPage: "" });

        if (this.state.error === "") {
            this.setState({ products: [] });
            this.fetchData();
        }
    }

    render() {
        const { products, modalPage, selectedProduct, showModal, result } = this.state;
        console.log("products", products);

        return (
            <div className="admin-table">
                <div className="result">{result !== "" ? <p>{result}</p> : null}</div>
                <Table striped hover className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Weight</th>
                            <th>Image location</th>
                            <th>category</th>
                            <th className="mg-1">
                                <button className="btn-new" id="btn-new">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((el) => (
                            <tr key={el._id}>
                                <td>{el.name}</td>
                                <td className="description">{el.description}</td>
                                <td> € {el.price.$numberDecimal}</td>
                                <td>{el.weight} Gr </td>
                                <td className="path">{el.imagePath}</td>
                                <td>{el.categoryId.name}</td>
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
                <AdminProductModal
                    state={this.props.location.state}
                    setResult={this.setResult}
                    handleHide={this.handleHide}
                    product={selectedProduct}
                    modalPage={modalPage}
                    showModal={showModal}
                />
            </div>
        );
    }
}

export default AdminProduct;
