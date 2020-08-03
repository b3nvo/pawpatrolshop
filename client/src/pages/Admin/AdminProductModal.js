import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class AdminProductModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.showModal,
            product: this.props.product || "",
            modalType: this.props.modalPage || "",
            admin: this.props.state
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {
        this.setState({ product: this.props.product });
        this.setState({ modalType: this.props.modalPage });
    }

    handleHide = () => {
        this.props.handleHide();
    };

    handleSubmit = async () => {
        console.log("hi");

        await this.handleChange();
        console.log("submit state", this.state);

        switch (this.state.modalType) {
            case "btn-delete":
                const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json", Token: `${this.props.state.token}` }
                };
                const request = await fetch(`/api/products/${this.state.product}`, requestOptions);
                const json = await request.json();
                if (json.message === "deleted") {
                    this.props.setResult("Successfully deleted product");
                    this.handleHide();
                    break;
                } else {
                    this.props.setResult("An error occured while deleting the product, please contact the developer.");
                    break;
                }
            case "default":
                // do nothing
                break;
            case "btn-edit":
                break;
            case "btn-new":
                break;
        }
    };

    render() {
        const { error } = this.state;

        return (
            <Modal show={this.props.showModal} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting a product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this product ?</p>
                    <p className="error">{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
