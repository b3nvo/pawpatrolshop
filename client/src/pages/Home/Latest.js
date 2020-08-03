import React from "react";
import "./Latest.css";
import { withRouter } from 'react-router-dom';
import { Card, Col } from "react-bootstrap";

class Latest extends React.Component {
    constructor(props) {
        super(props);

        this.navigateToProduct = this.navigateToProduct.bind(this);
    }

    async componentDidMount() {
        console.log("hello");

        this.props.fetchProducts();
    }

    navigateToProduct(e) {
        const productId = e.currentTarget.getAttribute('data-key');

        this.props.history.push('/product/' + productId);
    }

    render() {
        return (
            <>
                {this.props.products.map((el, i) => (
                    <Col xs="4" className="col-card"  onClick={this.navigateToProduct} key={i} data-key={el._id}>
                        <Card className="card" key={el._id}>
                            <Card.Img variant="top" src={el.imagePath} />
                            <Card.Body>
                                <Card.Title>{el.name}</Card.Title>
                                <Card.Text>{el.description} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </>
        );
    }
}

export default withRouter(Latest);
