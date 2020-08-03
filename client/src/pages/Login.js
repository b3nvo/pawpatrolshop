import React from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  
  validateForm() {
    const {email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    
    var result = {};

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    await fetch("/api/users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          if (data.token !== "" || data.token !== undefined) {
            console.log('token', data.token);
            this.setState({token: data.token});
    
            this.props.history.push({
              pathname: '/home',
              state: {email: this.state.email, token: data.token}
            });
          } else {
            // do nothing
          }
        } else {
          this.setState({ error: 'password is incorrect'});
        }
      });

      

      console.log(this.state);
  }

  render() {
    const { email, password, error } = this.state; 

  return (
    <div className="Login">
      <Form onSubmit={this.handleSubmit}>
        {error === "" ? null : <p className="error">{error}</p>}
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!this.validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );
  }
}

export default withRouter(Login);
