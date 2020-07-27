import React from 'react';
import { Button, Form } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                countryId: '',
                address: '',
                zipCode: '',
                city: '',
            countries: []
        };
        this.register = this.register.bind(this);
    }

    async componentDidMount() {
        
        const response = await fetch('/api/users/country');
        const json = await response.json();
        console.log(json.data);
        this.setState({countries: json.data});

        console.log(this.state.countries);
    }

    validateForm() {
        const {email, password, firstName, lastName, countryId, address, zipCode, city} = this.state;
        return email.length > 10 && password.length > 6 && firstName.length > 2 && lastName.length > 2 && countryId.length > 2 && address.length > 2 && zipCode.length > 3 && city.length > 2;
    }

    async register(event) {
        event.preventDefault();

        const { email, password, firstName, lastName, countryId, address, zipCode, city} = this.state;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, countryId: countryId, address: address, zipCode: zipCode, city: city }),
          };
          await fetch("/api/users/create", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.message === 'added') {
                this.props.history.push('/home');
              } else {
                console.log('something went wrong')
              }
            });
    }

    render() {
        const {email, password, firstName, lastName, countryId, address, zipCode, city} = this.state;
        return(
            <Form className="register" onSubmit={this.register}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => this.setState({
                        email: e.target.value
                    })}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => this.setState({
                        password: e.target.value
                    })}
                    />
                </Form.Group>
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password Confirmation"
                    />
                </Form.Group>

                

                <Form.Group controlId="firstNameLastName" className="inline">
                    <Form.Group  controlId="firstName" className="block">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                        className="short"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => this.setState({
                            firstName: e.target.value
                        })}
                        />
                    </Form.Group>
                    <Form.Group  controlId="lastName" className="block">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                        className="short"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => this.setState({
                            lastName: e.target.value
                        })}
                        />
                    </Form.Group>
                </Form.Group>

                <Form.Group controlId="countryId">
                    <Form.Label>Country</Form.Label>
                    <Form.Control as="select"
                    placeholder="Country"
                    onChange={(e) => {
                        const selectedIndex = e.target.options.selectedIndex;
                        this.setState({ 
                            countryId: e.target.options[selectedIndex].getAttribute('data-key')            
                        });
                    }}
                    >
                        <option></option>
                    {this.state.countries.map(el => (
                        <option key={el._id} data-key={el._id}>{el.name}</option>
                    ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group  controlId="address">
                    <Form.Label>Address and House number</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => this.setState({
                        address: e.target.value
                    })}
                    />
                </Form.Group>

                <Form.Group controlId="zipCodeCity" className="inline">
                    <Form.Group  controlId="zipCode" className="block">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                        className="short"
                        type="text"
                        placeholder="Zipcode"
                        value={zipCode}
                        onChange={(e) => this.setState({
                            zipCode: e.target.value
                        })}
                        />
                    </Form.Group>

                    <Form.Group  controlId="city" className="block">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                        className="short"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => this.setState({
                            city: e.target.value
                        })}
                        />
                    </Form.Group>
                </Form.Group>

                <Form.Group controlId="submit">
                    <Button variant="primary" type="submit">
                    Register
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default withRouter(Register);