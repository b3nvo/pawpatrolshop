import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class AdminUsersModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: this.props.showModal,
      user: this.props.user || "",
      modalType: this.props.modalPage || "",
      admin: this.props.state,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    this.setState({ user: this.props.user });
    this.setState({ modalType: this.props.modalPage });
  }

  handleHide = () => {
    this.props.handleHide();
  };

  handleSubmit = async () => {
    console.log("hi");

    await this.handleChange();
    console.log("submit state", this.state);

    switch(this.state.modalType) {
      case 'btn-delete':
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json", "Token": `${this.props.state.token}` } 
        };
        const request = await fetch(`/api/users/${this.state.user}`, requestOptions);
        const json = await request.json();
        if (json.message === 'deleted') {
          this.handleHide();
          break;
        } else {
          this.props.setError('failed deleting the user');
          break;
        }
        case 'default':
          // do nothing
          break;
        case 'btn-edit':
          break;
        case 'btn-new':
          break;
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Modal show={this.props.showModal} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user ?</p>
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
